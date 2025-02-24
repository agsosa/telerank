import { EnumEntryType } from "telerank-shared/lib/EntryType";

interface ITelegramInfo {
  username: string;
  members: number;
  title: string;
  type: EnumEntryType;
  description: string;
  photoUrl: string;
}

export default ITelegramInfo;
