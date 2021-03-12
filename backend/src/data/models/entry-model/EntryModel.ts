import { model, Schema, Model } from "mongoose";
import IEntry from "./IEntry";
import EnumLanguages from "./EnumLanguage";

// TODO: Implement EnumCategories

const EntryModelSchema = new Schema({
  username: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  language: { type: String, required: true, default: EnumLanguages.ENGLISH },
  category: { type: String, required: true, default: "Other" },
  title: { type: String, required: false },
  description: { type: String, required: false },
  members: { type: Number, required: false, default: 0 },
  image: { type: String, required: false },
  createdDate: { type: Date, required: false, default: Date.now },
  updatedDate: { type: Date, required: false, default: Date.now },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  featured: { type: Boolean, required: false, default: false },
  reports: { type: Number, required: false, default: 0 },
  pending: { type: Boolean, required: true, default: true },
  scam: { type: Boolean, required: true, default: false },
  removed: { type: Boolean, required: true, default: true },
  views: { type: Number, required: false, default: 0 },
});

export const EntryModel: Model<IEntry> = model("EntryModel", EntryModelSchema);

export function GetAllEntries(): Promise<IEntry[]> {
  return new Promise((resolve, reject) => {
    EntryModel.find({}, (err, res: IEntry[]) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

export function AddEntry(obj: IEntry): Promise<IEntry> {
  return new Promise((resolve, reject) => {
    EntryModel.create(obj, (err, instance: IEntry) => {
      if (err) reject(err);
      resolve(instance);
    });
  });
}

export function ListEntries(perPage: number, page: number): Promise<IEntry[]> {
  return new Promise((resolve, reject) => {
    EntryModel.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec((err, entries: IEntry[]) => {
        if (err) reject(err);
        resolve(entries);
      });
  });
}
