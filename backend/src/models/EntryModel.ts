import { model, Schema, Model } from "mongoose";
import fuzzySearching from "mongoose-fuzzy-searching";
import { IEntry, IEntryDocument } from "models/IEntry";
import { EnumLanguage } from "models/EnumLanguage";

// TODO: Implement cache?
// TODO: Implement EnumCategories/Categories from /shared/

const EntryModelSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  type: { type: String, required: true, index: true },
  language: {
    type: String,
    required: true,
    default: EnumLanguage.ENGLISH,
    index: true,
  },
  category: { type: String, required: true, default: "OTHER", index: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
  members: { type: Number, required: false, default: 0 },
  image: { type: String, required: false },
  updatedDate: { type: Date, required: false, default: Date.now },
  addedDate: { type: Date, required: false, default: Date.now, index: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  featured: { type: Boolean, required: false, default: false, index: true },
  reports: { type: Number, required: false, default: 0, index: true },
  pending: { type: Boolean, required: true, default: true, index: true },
  removed: { type: Boolean, required: true, default: true, index: true },
  views: { type: Number, required: false, default: 0 },
});

EntryModelSchema.plugin(fuzzySearching, {
  fields: ["username", "description", "title"],
});

export const EntryModel: Model<IEntryDocument> = model(
  "EntryModel",
  EntryModelSchema
);

/* 
// Add fuzzy nGrams to existing data
const updateFuzzy = async () => {
  const attrs = ["title", "username", "description"];
  const entities = await EntryModel.find();

  const updateToDatabase = async (data: any) => {
    try {
      const obj = attrs.reduce(
        (acc, attr) => ({ ...acc, [attr]: data[attr] }),
        {}
      );
      // eslint-disable-next-line
      return EntryModel.findByIdAndUpdate(data._id, obj).catch(log.error);
    } catch (e) {
      log.error(e);
      return null;
    }
  };

  entities.map((q) => updateToDatabase(q));
};

updateFuzzy(); */

function getCommonSelectExcludeFields(includeDescription = true): string {
  let result = `-reports -pending -removed`;
  if (!includeDescription) result += " -description";
  return result;
}

export function GetPaginatedList(
  perPage: number,
  page: number,
  includeDescription = false,
  filterQuery: Record<string, unknown> = {},
  sort: Record<string, unknown> = {},
  search = ""
): Promise<IEntry[]> {
  return EntryModel.find({ pending: false, removed: false, ...filterQuery })
    .fuzzySearch({
      query: search,
      prefixOnly: true,
      exact: true,
    })
    .limit(perPage)
    .skip(perPage * page)
    .select(getCommonSelectExcludeFields(includeDescription))
    .sort(sort)
    .exec();
}

export function GetList(
  query: Record<string, unknown> = {},
  sort: Record<string, unknown> = {},
  includeDescription = false,
  maxEntries = 0
): Promise<IEntry[]> {
  return EntryModel.find({ pending: false, removed: false, ...query })
    .limit(maxEntries)
    .select(getCommonSelectExcludeFields(includeDescription))
    .sort(sort)
    .exec();
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
  return EntryModel.exists({ username: username.toLowerCase() });
}

export function getRandomEntry(): Promise<boolean> {
  return EntryModel.aggregate([
    { $match: { pending: false, removed: false } },
    { $sample: { size: 1 } },
  ]).exec();
}
