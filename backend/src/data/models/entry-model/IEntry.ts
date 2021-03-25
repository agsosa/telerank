import { Document } from "mongoose";
import { EnumLanguage } from "./EnumLanguage";
import { EnumEntryType } from "./EnumEntryType";

export interface IEntry {
  username: string;
  type: EnumEntryType;
  language: EnumLanguage;
  category: string;
  title: string;
  description: string;
  members: number;
  image: string;
  addedDate: Date;
  updatedDate: Date;
  likes: number;
  dislikes: number;
  featured: boolean;
  reports: number;
  pending: boolean;
  removed: boolean;
  views: number;
}

export interface IEntryDocument extends IEntry, Document {}
