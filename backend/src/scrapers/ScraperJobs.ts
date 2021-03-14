import { spawn } from "child_process";
import { Document } from "mongoose";
import IScrapedMedia from "./content-scrapers/IScrapedMedia";
import scrapeTelegramChannelsMe from "./content-scrapers/telegramchannels.me.scraper";
import * as EntryModel from "../data/models/entry-model/EntryModel";
import { getTelegramInfo } from "./telegram-proto/TelegramProto";
import { uploadPhoto } from "../lib/GCloud";
import { log } from "../lib/Helpers";
import { IEntry } from "../data/models/entry-model/IEntry";
import ITelegramInfo from "./telegram-proto/ITelegramInfo";
import EnumLanguage from "../data/models/entry-model/EnumLanguage";

const isJobRunning = false; // True if a job is already running

/* 
  PopulateDatabaseJob():
    This function will scrape real Telegram channels, bots, users, stickers 
    from different websites and add them to the database (EntryModel) 
    if they're not already added.

    1) Execute the scrapers from content-scrapers to find new usernames and try to categorize them
    2) Discard usernames already added to the database, discard usernames with scam=true
    3) --- For each scraped username:
    
      - Get all the info (title, description, photo, etc) using the TelegramProto module
      - Discard usernames with info.scam = true
      - Process the info (i.e. upload the photo to Google Cloud Storage)
      - Add to the database (EntryModel)
*/
export async function PopulateDatabaseJob(): Promise<void> {
  try {
    // eslint-disable-next-line
    console.time("PopulateDatabase");

    const mediaList: IScrapedMedia[] = await scrapeTelegramChannelsMe();
    const entryList: IEntry[] = [];
    const uploadPromises: Promise<any>[] = [];

    for (let i = 0; i < mediaList.length; i += 1) {
      const q = mediaList[i];

      // TODO: Check if username is already on database, if not continue

      log.info(`Executing getTelegramInfo for ${q.username}`);

      // eslint-disable-next-line
      const info = await getTelegramInfo(q.username); // !IMPORTANT: Wait for each getTelegramInfo() to avoid Telegram API limits

      log.info("ok");

      if (info && !info.scam) {
        uploadPromises.push(
          uploadPhoto(info.photoBytes, info.username).then((imgURL) => {
            const entry: IEntry = {
              username: info.username,
              type: info.type,
              language: q.language as EnumLanguage,
              category: q.category,
              title: info.title,
              description: info.description,
              members: info.members,
              image: imgURL || "",
              createdDate: info.creationDate,
              updatedDate: new Date(),
              likes: 0,
              dislikes: 0,
              featured: false,
              reports: 0,
              pending: true,
              removed: false,
              views: 0,
            };

            entryList.push(entry);
          })
        );
      }
    }

    await Promise.all(uploadPromises);
    EntryModel.Insert(entryList);

    // eslint-disable-next-line
    console.timeEnd("PopulateDatabase");
  } catch (err) {
    log.error(`PopulateDatabase error: ${err}`);
  }
}

export function RefreshAllTelegramInfosJob() {
  throw new Error("NotImplemented");
}

// TODO: En UpdateSavedInfo revisar si ITelegramInfo scam field = true, en caso de ser true setear IEntry removed = true
