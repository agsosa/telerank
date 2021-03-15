import { model, Schema, Model, Document } from "mongoose";
import { IEntry, IEntryDocument } from "./IEntry";
import EnumLanguage from "./EnumLanguage";

// TODO: Implement cache?
// TODO: Implement EnumCategories

const EntryModelSchema = new Schema({
  username: { type: String, required: true, unique: true },
  type: { type: String, required: true, index: true },
  language: {
    type: String,
    required: true,
    default: EnumLanguage.ENGLISH,
    index: true,
  },
  category: { type: String, required: true, default: "Other", index: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
  members: { type: Number, required: false, default: 0 },
  image: { type: String, required: false },
  createdDate: { type: Date, required: false, default: Date.now },
  updatedDate: { type: Date, required: false, default: Date.now },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  featured: { type: Boolean, required: false, default: false, index: true },
  reports: { type: Number, required: false, default: 0, index: true },
  pending: { type: Boolean, required: true, default: true, index: true },
  removed: { type: Boolean, required: true, default: true, index: true },
  views: { type: Number, required: false, default: 0 },
});

export const EntryModel: Model<IEntryDocument> = model(
  "EntryModel",
  EntryModelSchema
);

function getCommonSelectExcludeFields(includeDescription = true): string {
  let result = `-reports -pending -removed`;
  if (!includeDescription) result += " -description";
  return result;
}

export function GetPaginatedList(
  perPage: number,
  page: number,
  includeDescription = true,
  query: Record<string, unknown> = {}
): Promise<IEntry[]> {
  return new Promise((resolve, reject) => {
    EntryModel.find({ pending: false, removed: false, ...query })
      .limit(perPage)
      .select(getCommonSelectExcludeFields(includeDescription))
      .skip(perPage * page)
      .exec((err, entries) => {
        if (err) reject(err);
        resolve(entries);
      });
  });
}

export function GetList(
  query: Record<string, unknown> = {},
  includeDescription = true
): Promise<IEntry[]> {
  return new Promise((resolve, reject) => {
    EntryModel.find({ pending: false, removed: false, ...query })
      .select(getCommonSelectExcludeFields(includeDescription))
      .exec((err, entries) => {
        if (err) reject(err);
        resolve(entries);
      });
  });
}

export async function Insert(obj: IEntry | IEntry[]): Promise<void> {
  return new Promise((resolve, reject) => {
    if (Array.isArray(obj)) {
      EntryModel.insertMany(obj, { ordered: false }, (err: any) => {
        if (err) reject(err);
        resolve();
      });
    } else {
      EntryModel.create(obj, (err) => {
        if (err) reject(err);
        resolve();
      });
    }
  });
}

export function isUsernameSaved(username: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    EntryModel.exists({ username: username.toLowerCase() }, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}
