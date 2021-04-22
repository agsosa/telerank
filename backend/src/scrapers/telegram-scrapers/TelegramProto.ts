/* eslint-disable camelcase */
import { MTProto } from "@mtproto/core";
import moment from "moment";
import scrapeIt, { ScrapeResult } from "scrape-it";
import { sleep, log } from "lib/Helpers";
import ITelegramInfo from "scrapers/telegram-scrapers/ITelegramInfo";
import TelegramSecrets from "scrapers/telegram-scrapers/TelegramSecrets";
import IScrapedMedia from "scrapers/content-scrapers/IScrapedMedia";
import { EnumEntryType } from "telerank-shared/lib";
import TelegramAuth from "scrapers/telegram-scrapers/TelegramAuth";

// Flood wait rate https://github.com/danog/MadelineProto/issues/284
let callTime: moment.Moment | null; // Time it took to make the api calls before a FLOOD_WAIT error
const FLOOD_WAIT_RATE_SAFEGUARD_SECONDS = 1;
let floodWaitRate: number | null; // Seconds
let N = 0;
let currentCalls = 0;
let initialized = false;

export const mtproto = new MTProto({
  api_id: TelegramSecrets.apiId,
  api_hash: TelegramSecrets.apiHash,
});

export const initializeTelegramProto = async (): Promise<void> => {
  const auth = await TelegramAuth();
  log.info(`Auth result = ${auth}`);
  initialized = true;
};

export const isTelegramProtoReady = (): boolean => initialized;

// mtproto wrapper with anti flood and dc handle
export const api = {
  async call(method: string, params = {}, options = {}): Promise<any> {
    if (!callTime) callTime = moment(); // Set APICallTime during the first call, then we use it to measure the time took to get a floodWaitRate

    if (!floodWaitRate) N += 1;
    else if (currentCalls === N) {
      log.info(`Waiting flootWaitRate ${floodWaitRate}`);
      sleep(floodWaitRate * 1000);
      currentCalls = 0;
      N = 0;
      callTime = null;
      floodWaitRate = null;
    } else currentCalls += 1;

    return mtproto.call(method, params, options).catch(async (error) => {
      const { error_code, error_message } = error;

      if (error_code === 420) {
        const seconds = +error_message.split("FLOOD_WAIT_")[1];

        floodWaitRate =
          moment().diff(callTime, "seconds") +
          seconds +
          FLOOD_WAIT_RATE_SAFEGUARD_SECONDS;

        // TODO: Switch to another phone when the flood wait is too long

        log.info(
          `TELEGRAM FLOOD_WAIT ${seconds} seconds. Calculated flood wait rate = ${floodWaitRate}`
        );

        await sleep(seconds * 1000);

        return this.call(method, params, options);
      }

      if (error_code === 303) {
        const [type, dcId] = error_message.split("_MIGRATE_");

        // If auth.sendCode call on incorrect DC need change default DC, because call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
        if (type === "PHONE") {
          await mtproto.setDefaultDc(+dcId);
        } else {
          // eslint-disable-next-line no-param-reassign
          options = {
            ...options,
            dcId: +dcId,
          };
        }

        return this.call(method, params, options);
      }

      return Promise.reject(error);
    });
  },
};

export function getCurrentFloodWait(): Promise<number> {
  return new Promise((resolve) => {
    mtproto
      .call("contacts.resolveUsername", {
        username: "Telegram",
      })
      .then(() => resolve(0))
      .catch(async (error) => {
        const { error_code, error_message } = error;
        if (error_code === 420) {
          const seconds = +error_message.split("FLOOD_WAIT_")[1];
          resolve(seconds);
        } else resolve(0);
      });
  });
}

export async function isValidTelegramUsername(
  username: string
): Promise<boolean> {
  try {
    // ScrapeIt Options
    const scrapeOptions: scrapeIt.ScrapeOptions = {
      title: {
        selector: ".tgme_page_title span",
      },
    };

    // Execute ScrapeIt
    const result: ScrapeResult<Record<string, any>> = await scrapeIt(
      `https://t.me/${username}`,
      scrapeOptions
    );
    return result.data.title;
  } catch (err) {
    log.error(err);
    return true;
  }
}

// Get ITelegramInfo for a username, including photo
/* export async function getTelegramInfo(
  target: IScrapedMedia | string
): Promise<ITelegramInfo | undefined> {
  try {
    // Grab username data with contacts.resolveUsername

    const username = typeof target === "string" ? target : target.username;

    const userData = await api.call("contacts.resolveUsername", {
      username,
    });

    if (userData && (userData.chats[0] || userData.users[0])) {
      const data = userData.chats[0] || userData.users[0];

      // TODO: Add stickers to the condition
      if (data.megagroup || data.broadcast || data.bot) {
        // Identify username type (group/channel/bot/sticker)
        const type: EnumEntryType =
          (data.megagroup && EnumEntryType.GROUP) ||
          (data.broadcast && EnumEntryType.CHANNEL) ||
          (data.bot && EnumEntryType.BOT) ||
          EnumEntryType.STICKER;

        // Get properties
        const { scam, photo, access_hash, id, date } = data;
        const title = type === EnumEntryType.BOT ? data.first_name : data.title; // TODO: Add support for tickers

        let description = ""; // TODO: Support tickers if they have description
        let peer = null; // Required to download photo
        let members = 0;

        // Get description (about) and build the peer (InputPeer) object required to download the photo
        // We need this since the data object doesn't contain the about/description field
        if (type === EnumEntryType.GROUP || type === EnumEntryType.CHANNEL) {
          const fullChannelData = await api.call("channels.getFullChannel", {
            channel: {
              _: "inputChannel",
              channel_id: id,
              access_hash,
            },
          });

          description = fullChannelData.full_chat.about;
          members = fullChannelData.full_chat.participants_count;
          peer = { _: "inputPeerChannel", channel_id: id, access_hash }; // Required to download photo
        }
        if (type === EnumEntryType.BOT) {
          const fullUserData = await api.call("users.getFullUser", {
            id: {
              _: "inputUser",
              user_id: id,
              access_hash,
            },
          });

          description = fullUserData.about;
          peer = { _: "inputPeerUser", user_id: id, access_hash }; // Required to download photo
        }
        // TODO: Sticker case

        // Download photo
        const fileLocation = photo.photo_small;

        const file = await api.call("upload.getFile", {
          location: {
            _: "inputPeerPhotoFileLocation",
            big: false,
            peer,
            volume_id: fileLocation.volume_id,
            local_id: fileLocation.local_id,
          },
          limit: 512 * 512,
          offset: 0,
        }); // The photo will be returned by Telegram as uint8Array

        const result: ITelegramInfo = {
          scam,
          title,
          type,
          username,
          creationDate: date ? new Date(date * 1000) : new Date(),
          members,
          photoBytes: file.bytes,
          description,
        };

        return result;
      }
    }

    return undefined;
  } catch (err) {
    log.error(err);
    return undefined;
  }
}
*/
