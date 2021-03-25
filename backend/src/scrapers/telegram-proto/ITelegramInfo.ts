import { EnumEntryType } from "../../data/models/entry-model/EnumEntryType";

interface ITelegramInfo {
  username: string;
  members: number;
  title: string;
  type: EnumEntryType;
  description: string;
  photoUrl: string;
}

export default ITelegramInfo;
