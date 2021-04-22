import { EnumEntryType } from "telerank-shared/lib";
import { EnumLanguage } from "models/EnumLanguage";

export default interface IScrapedMedia {
  username: string;
  type: EnumEntryType;
  category: string;
  language: EnumLanguage;
}
