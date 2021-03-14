import IScrapedMedia from "../content-scrapers/IScrapedMedia";
import EnumEntryType from "../../data/models/entry-model/EnumEntryType";

interface ITelegramInfo {
  scrapedMedia?: IScrapedMedia;
  username: string;
  photoBytes: Uint8Array;
  members: number;
  title: string;
  type: EnumEntryType;
  description: string;
  scam: boolean;
  creationDate: Date;
}

export default ITelegramInfo;
