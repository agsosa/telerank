import { EnumEntryType } from "telerank-shared/lib/EntryType";
import { EnumLanguage } from "telerank-shared/lib/Language";

export default interface IScrapedMedia {
  username: string;
  type: EnumEntryType;
  category: string;
  language: EnumLanguage;
}
