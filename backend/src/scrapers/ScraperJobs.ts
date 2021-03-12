import { spawn } from "child_process";
import IScrapedMedia from "./content-scrapers/IScrapedMedia";
import TelegramChannelsMe from "./content-scrapers/telegramchannels.me.scraper";
import * as EntryModel from "../data/models/EntryModel";

export async function PopulateDatabase(): Promise<void> {
  try {
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

          /* q.title = data.title;
        q.description = data.description;
        q.members = data.members;
        q.image = data.image;
        q.created_date = Date.now();
        q.updated_date = Date.now();
        q.likes = 0;
        q.dislikes = 0;
        q.featured = false;

        console.log(`final q = ${JSON.stringify(q)}`); */

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
  }
}

export function RefreshAllTelegramInfos() {}

export function ScrapeTelegramInfo(obj: IScrapedMedia): void;
export function ScrapeTelegramInfo(username: string): void;
export function ScrapeTelegramInfo(target: IScrapedMedia | string): void {}
