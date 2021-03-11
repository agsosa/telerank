import { model, Schema, Model, Document } from "mongoose";

const EntryModelSchema = new Schema({
  username: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  language: { type: String, required: true, default: "English" },
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
  removed: { type: Boolean, required: true, default: true },
  views: { type: Number, required: false, default: 0 },
});

export interface IEntry extends Document {
  username: string;
  type: string;
  language: string;
  category: string; // TODO: EnumCategory, EnumType, EnumLanguage, etc
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
  removed: boolean;
  views: number;
}

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
        if (err) {
          reject(err);
        } else {
          resolve(entries);
        }
      });
  });
}
