/* eslint-disable camelcase */
import scrapeIt, { ScrapeResult } from "scrape-it";
import { log } from "lib/Helpers";
import ITelegramInfo from "scrapers/telegram-scrapers/ITelegramInfo";
import IScrapedMedia from "scrapers/content-scrapers/IScrapedMedia";
import { EnumEntryType } from "telerank-shared/lib/EntryType";

// TODO: Add support for stickers
export async function getTelegramInfo(
  target: string | IScrapedMedia
): Promise<ITelegramInfo | undefined> {
  try {
    const username = typeof target === "string" ? target : target.username;

    // ScrapeIt Options
    const scrapeOptions: scrapeIt.ScrapeOptions = {
      title: {
        selector: ".tgme_page_title span",
      },
      image: {
        selector: ".tgme_page_photo_image",
        attr: "src",
      },
      description: {
        selector: ".tgme_page_description",
        how: "text",
      },
      members: {
        selector: ".tgme_page_extra",
      },
    };

    // Execute ScrapeIt
    const result: ScrapeResult<Record<string, string>> = await scrapeIt(
      `https://t.me/${username}`,
      scrapeOptions
    );

    const { data } = result;

    const isValid = data.title;

    if (isValid) {
      let type;

      const isBot = username.toLowerCase().endsWith("bot"); // TODO: Check if it's really a bot using MTProto
      const isGroup = data.members.toLowerCase().includes("online");
      const isChannel = data.members.toLowerCase().includes("members");

      if (isBot) type = EnumEntryType.BOT;
      else if (isGroup) type = EnumEntryType.GROUP;
      else if (isChannel) type = EnumEntryType.CHANNEL;
      else return undefined;

      const membersCountStr = data.members
        .substr(0, data.members.indexOf("members"))
        .replace(" ", "");
      const members = Number.parseInt(membersCountStr, 10) || 0;

      return {
        username,
        type,
        description: data.description,
        title: data.title,
        photoUrl: data.image,
        members,
      };
    }

    return undefined;
  } catch (err) {
    log.error(err);
    return undefined;
  }
}
