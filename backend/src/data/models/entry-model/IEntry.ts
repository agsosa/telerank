import { Document } from "mongoose";
import EnumLanguage from "./EnumLanguage";
import EnumType from "./EnumType";

interface IEntry extends Document {
  username: string;
  type: EnumType;
  language: EnumLanguage;
  category: string; // TODO: Implement EnumCategory
  title: string;
  description: string;
  members: number;
  image: string;
  createdDate: Date;
  updatedDate: Date;
  likes: number;
  dislikes: number;
  featured: boolean;
  reports: number;
  pending: boolean;
  scam: boolean;
  removed: boolean;
  views: number;
}

export default IEntry;
