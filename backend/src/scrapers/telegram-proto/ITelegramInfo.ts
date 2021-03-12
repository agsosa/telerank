import IScrapedMedia from "../content-scrapers/IScrapedMedia";
import EnumEntryType from "../../data/models/entry-model/EnumEntryType";

interface ITelegramInfo {
  scrapedMedia?: IScrapedMedia;
  username: string;
  downloadedPhotoPath: string;
  members: number;
  title: string;
  type: EnumEntryType;
  description: string;
  scam: boolean;
  creationDate: number;
}

export default ITelegramInfo;
