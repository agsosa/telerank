/* eslint-disable no-await-in-loop  */
/* eslint-disable no-loop-func  */
import Job from "jobs/Job";
import scrapeTelegramChannelsMe from "scrapers/content-scrapers/TelegramChannelsMeScraper";
import { uploadPhoto } from "lib/GCloud";
import * as EntryModel from "models/EntryModel";
import { IEntry } from "models/IEntry";
import IScrapedMedia from "scrapers/content-scrapers/IScrapedMedia";
import { log } from "lib/Helpers";
import { getTelegramInfo } from "scrapers/telegram-scrapers/TelegramScraper";
import IJobOptions from "jobs/IJobOptions";

/* 
  PopulateDatabaseJob:
    This class will scrape real Telegram channels, bots, users, stickers (usernames)
    from different websites and add them to the database (EntryModel) if they're not already added. 
    The state for the new entries will be "Pending" (needs manual review)

    1) Execute the scrapers from content-scrapers to find new usernames (some scrapers will include a category and extra info)
    2) Discard usernames already added to the database
    3) --- For each scraped username:
    
      - Get all the info (title, description, photo bytes, member count, etc) from Telegram (discarding invalid usernames)
      - Process the info (i.e. upload the photo to Google Cloud Storage or grab the public URL if it's already uploaded)
      - Add to the database (EntryModel)

    P.S. Add the entries to the database one by one to be safe.
*/
export default class PopulateDatabaseJob extends Job {
  constructor() {
    const options: IJobOptions = {
      name: "PopulateDatabaseJob",
      runIntervalMinutes: 60 * 8,
      isConcurrent: false,
      useRetry: true,
      maxRetries: 3,
    };

    super(options);
  }

  async runJob(): Promise<void> {
    try {
      const mediaList: IScrapedMedia[] = await scrapeTelegramChannelsMe();

      log.info("Start Telegram scraping");

      const uploadPromises: Promise<any>[] = [];
      let added = 0;
      let skipped = 0;

      for (let i = 0; i < mediaList.length; i += 1) {
        const q = mediaList[i];

        const alreadyInDB = await EntryModel.isUsernameSaved(q.username);

        if (!alreadyInDB) {
          const info = await getTelegramInfo(q.username);

          if (info) {
            log.info("uploadPhoto ", q.username);
            uploadPromises.push(
              uploadPhoto(info.photoUrl, info.username).then((imgURL) => {
                const entry: IEntry = {
                  username: info.username.toLowerCase(),
                  type: info.type,
                  language: q.language,
                  category: q.category,
                  title: info.title,
                  description: info.description,
                  members: info.members,
                  image: imgURL || "",
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

                log.info("Inserting to DB", q.username);

                EntryModel.Insert(entry).then(() => {
                  log.info(`username ${entry.username} saved`);
                  added += 1;
                });
              })
            );
          }
        } else skipped += 1;
      }

      log.info("Waiting for all promises to settle");

      await Promise.allSettled(uploadPromises);

      log.info(
        `${this.options.name} is done. Added Entries: ${added}/${mediaList.length} (skipped: ${skipped})`
      );

      super.onSuccess();
    } catch (err) {
      super.onError(err);
    }
  }
}
