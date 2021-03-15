import scrapeIt, { ScrapeResult } from "scrape-it";
import _ from "lodash";
import IScrapedMedia from "./IScrapedMedia";
import { capitalizeStr, log } from "../../lib/Helpers";
import EnumEntryType, {
  parseEntryType,
} from "../../data/models/entry-model/EnumEntryType";
import EnumLanguage, {
  parseLanguage,
} from "../../data/models/entry-model/EnumLanguage";

// TODO: Extender clase Scraper

/*
 * TelegramChannels.me Scraper
 */

const LANGUAGES_TO_SCRAPE = ["es"]; // TODO: add en
const TYPES_TO_SCRAPE = ["groups"]; // TODO: add channels, bots, stickers
const getListURL = (lang: string, type: string, page: number) =>
  `https://telegramchannels.me/${lang}/${type}?category=all&sort=newest&page=${page}`;

// Start the TelegramChannels.me scraper
export default async function run(): Promise<IScrapedMedia[]> {
  // Initialize
  const promises: Promise<void>[] = [];
  let resultEntries: IScrapedMedia[] = [];

  // Run scrapePages() for every type and language in parallel
  TYPES_TO_SCRAPE.forEach((t) => {
    LANGUAGES_TO_SCRAPE.forEach((lang) => {
      promises.push(
        // eslint-disable-next-line
        scrapePages(t, lang).then((data) => {
          data.map((q) => resultEntries.push(q)); // Save the results from scrapePages() in our resultEntries array
        })
      );
    });
  });

  // Wait for all the scrapePages() to complete
  await Promise.allSettled(promises);

  // Remove duplicated entries by username
  resultEntries = _.uniqBy(resultEntries, "username");

  // Return final result
  log.info(`Done. Total Entries = ${resultEntries.length}`);

  return resultEntries;
}

// Get max page possible from a TelegramChannels.me list
async function getMaxPages(type: string, lang: string): Promise<number> {
  try {
    const url = getListURL(lang, type, 1);

    // ScrapeIt options
    const scrapeOptions: scrapeIt.ScrapeOptions = {
      pages: {
        listItem: ".pagination-list li",
        selector: "a",
      },
    };

    // Execute ScrapeIt
    const result: ScrapeResult<{ pages: string[] }> = await scrapeIt(
      url,
      scrapeOptions
    );

    // Process ScrapeIt Result
    const { pages } = result.data;
    const maxPages = parseInt(pages[pages.length - 1], 10);
    log.info(`Found max_pages = ${maxPages}`);

    // Return result
    if (Number.isNaN(maxPages)) throw new Error("Can't get max pages");
    return maxPages;
  } catch (err) {
    // TODO: Handle error
    log.error(err);
    return 0;
  }
}

// Scrape all the Media Cards from a TelegramChannels.me list
async function scrapeMediaCards(
  type: string,
  lang: string,
  page: number
): Promise<IScrapedMedia[]> {
  const url = getListURL(lang, type, page);

  // ScrapeIt Options
  const scrapeOptions: scrapeIt.ScrapeOptions = {
    entries: {
      listItem: "div.media-card",
      data: {
        category: {
          selector: ".card-label",
          convert: (str) => {
            const result = str
              .split(" ")
              [str.split(" ").length - 1].toLowerCase();
            return capitalizeStr(result);
          },
        },
        username: {
          selector: "a",
          attr: "href",
          convert: (x) => x.split("/")[x.split("/").length - 1].toLowerCase(),
        },
      },
    },
  };

  // Execute ScrapeIt
  const result: ScrapeResult<{
    entries: { category: string; username: string }[];
  }> = await scrapeIt(url, scrapeOptions);

  // Process ScrapeIt Result
  const { entries } = result.data;
  const final: IScrapedMedia[] = [];
  entries.forEach((q) => {
    final.push({
      ...q,
      type: parseEntryType(type) as EnumEntryType,
      language: parseLanguage(lang) as EnumLanguage,
    }); // Add extra fields, final result will be { category:string, username:string, type:string, language:string}
  });

  // Return result
  return final;
}

// Scrape all the available TelegramChannels.me pages for a type and language
async function scrapePages(
  type: string,
  lang: string
): Promise<IScrapedMedia[]> {
  // Initialize
  const entries: IScrapedMedia[] = [];
  const promises = [];
  const maxPages = await getMaxPages(type, lang);

  // Process the media-card elements for every page in parallel
  for (let page = 1; page < maxPages; page += 1) {
    promises.push(
      scrapeMediaCards(type, lang, page).then((data) => {
        data.map((q) => entries.push(q)); // Save the results from scrapeMediaCards in our entries array
      })
    );
  }

  // Wait for all the parallel scrapeMediaCards() to complete
  await Promise.allSettled(promises);

  // Return result
  log.info(`Scraping ${lang}_${type} done. Found ${entries.length} entries`);

  return entries;
}
