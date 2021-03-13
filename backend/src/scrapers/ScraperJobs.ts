import { spawn } from "child_process";
import IScrapedMedia from "./content-scrapers/IScrapedMedia";
import TelegramChannelsMe from "./content-scrapers/telegramchannels.me.scraper";
import * as EntryModel from "../data/models/entry-model/EntryModel";
import { getTelegramInfo } from "./telegram-proto/TelegramProto";
import { uploadPhoto } from "../lib/GCloud";
import { log } from "../lib/Helpers";

/* 
  PopulateDatabaseJob():
    This function will scrape real Telegram channels, bots, users, stickers 
    from different websites and add them to the database (EntryModel) 
    if they're not already added.

    1) Execute the scrapers from content-scrapers to find new usernames and try to categorize them
    2) Discard usernames already added to the database
    3) --- For each scraped username:
      - Get all the info (title, description, photo, etc) using the TelegramProto module
      - Process the info (i.e. upload the photo to Google Cloud Storage)
      - Construct a IEntry object
    4) Save each IEntry object from (3) to the database (EntryModel)
*/
export async function PopulateDatabaseJob(): Promise<void> {
  // TODO: Test cases: Bot, Group, Channel, big group/channel, invalid, IScrapedMedia
  const info = await getTelegramInfo("cordobabitcoin"); // dealtrackerbot, cordobabitcoin, unfolded
  if (info) {
    const imageUrl = await uploadPhoto(info.photoBytes, info.username);
    log.info(imageUrl);
  }

  /* try {
    console.time("PopulateDatabase");

    let media: IScrapedMedia[] = [];
    media = media.concat(await TelegramChannelsMe());
    // const promises: Promise<any>[] = [];

    media.forEach(async (q) => {
      await new Promise((resolve, reject) => {
        console.log(`Executing telegram.py for ${q.username}`);
        const pythonProcess = spawn("python", [
          "../python/telegram.py",
          q.username,
        ]);

        pythonProcess.stdout.setEncoding("latin1");
        pythonProcess.stdout.on("data", (res) => {
          const data = JSON.parse(res);
          if (!data || !data.members || Number.isNaN(data.members))
            throw new Error(
              `Received invalid data from Python ${data} for username ${q.username}`
            );


          console.log(`${q.username} ${res}`);

          // database.AddEntry(q, () => resolve());

          resolve(true);
        }); // end pythonProcess.stdout.on
      }); // end new Promise()

      // promises.push(prom);
    }); // end media.forEach()

    // await Promise.all(promises);

    console.timeEnd("PopulateDatabase");
  } catch (err) {
    console.log(`ScraperJobs: PopulateDatabase error: ${err}`);
  } */
}

// export function RefreshAllTelegramInfosJob() {}
