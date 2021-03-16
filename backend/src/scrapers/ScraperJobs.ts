/* eslint-disable no-await-in-loop  */
/* eslint-disable no-loop-func  */

import IScrapedMedia from "./content-scrapers/IScrapedMedia";
import scrapeTelegramChannelsMe from "./content-scrapers/telegramchannels.me.scraper";
import * as EntryModel from "../data/models/entry-model/EntryModel";
import { getTelegramInfo } from "./telegram-proto/TelegramProto";
import { uploadPhoto } from "../lib/GCloud";
import { capitalizeStr, log, sleep } from "../lib/Helpers";
import { IEntry } from "../data/models/entry-model/IEntry";

// TODO: Implement a job queue library or use cron jobs to automatically run the jobs every X hours
const isJobRunning = false; // True if a job is already running

/* 
  PopulateDatabaseJob():
    This function will scrape real Telegram channels, bots, users, stickers (usernames)
    from different websites and add them to the database (EntryModel) if they're not already added. 
    The state for the new entries will be "Pending" (needs manual review)

    1) Execute the scrapers from content-scrapers to find new usernames (some scrapers will include a category and extra info)
    2) Discard usernames already added to the database
    3) --- For each scraped username:
    
      - Get all the info (title, description, photo bytes, member count, etc) from Telegram using the TelegramProto module
      - Discard usernames with info.scam = true
      - Process the info (i.e. upload the photo to Google Cloud Storage or grab the public URL if it's already uploaded)
      - Add to the database (EntryModel)

    P.S. Add the entries to the database one by one to be safe.
*/
// TODO: Save the amount of new entries since the last run to display later on stats panel/graph
export async function PopulateDatabaseJob(): Promise<void> {
  try {
    // eslint-disable-next-line
    console.time("PopulateDatabase");

    const mediaList: IScrapedMedia[] = await scrapeTelegramChannelsMe();

    log.info(`PopulateDatabaseJob() will process ${mediaList.length} entries`);

    const uploadPromises: Promise<any>[] = [];
    let added = 0;
    let skipped = 0;

    for (let i = 0; i < mediaList.length; i += 1) {
      const q = mediaList[i];

      const exists = await EntryModel.isUsernameSaved(q.username);

      if (!exists) {
        log.info(`Executing getTelegramInfo for ${q.username}`);

        // !IMPORTANT: Wait for each getTelegramInfo() to avoid Telegram API limits
        await sleep(1 * 1000); // TODO: Optimize/automatically find the best rate to avoid TELEGRAM_FLOOD_WAITS
        const info = await getTelegramInfo(q.username);

        if (info && !info.scam) {
          uploadPromises.push(
            uploadPhoto(info.photoBytes, info.username).then((imgURL) => {
              const entry: IEntry = {
                username: info.username.toLowerCase(),
                type: info.type,
                language: q.language,
                category: capitalizeStr(q.category) || "Other",
                title: info.title,
                description: info.description,
                members: info.members,
                image: imgURL || "",
                createdDate: info.creationDate,
                updatedDate: new Date(),
                addedDate: new Date(),
                likes: 0,
                dislikes: 0,
                featured: false,
                reports: 0,
                pending: true,
                removed: false,
                views: 0,
              };

              EntryModel.Insert(entry).then(() => {
                added += 1;
              });
            })
          );
        }
      } else skipped += 1;
    }

    await Promise.all(uploadPromises);

    log.info(
      `PopulateDatabaseJob() is done. Added Entries: ${added}/${mediaList.length} (skipped: ${skipped})`
    );
    // eslint-disable-next-line
    console.timeEnd("PopulateDatabase");
  } catch (err) {
    log.error(`PopulateDatabase error: ${err}`);
  }
}

// Refresh the Telegram information (title, description, member count, photo, etc) for all the saved entries in the database
// TODO: Grab the Telegram Info from the telegram-proto module. If the username is now flagged as SCAM by Telegram, update the EntryModel field "removed" to true and skip
// TODO: Save the difference of members since the last run to display later on stats panel/graph
export function RefreshEntriesTelegramInfoJob() {
  throw new Error("NotImplemented");
}
