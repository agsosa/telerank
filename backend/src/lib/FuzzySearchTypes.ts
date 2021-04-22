/* 
  Types for mongoose-fuzzy-searching plugin
*/

/* eslint-disable */

declare module "mongoose" {
  type MongooseFuzzySearchingField<T = any> =
    | keyof T
    | {
        name: keyof T;
        minSize?: number;
        weight?: number;
        prefixOnly?: boolean;
        escapeSpecialCharacters?: boolean;
        keys?: (string | number)[];
      };

  interface MongooseFuzzySearchingMiddlewares<T = unknown> {
    preSave(this: Query<T, any>): void;
    preInsertMany(this: Query<T, any>): Promise<void>;
    preUpdate(this: Query<T, any>): Promise<void>;
    preUpdateOne(): Promise<void>;
    preFindOneAndUpdate(this: Query<T, any>): Promise<void>;
    preUpdateMany(this: Query<T, any>): Promise<void>;
  }

  interface MongooseFuzzySearchingOptions<T extends Record<string, unknown>> {
    fields?: MongooseFuzzySearchingField<T>[];
    middlewares?: MongooseFuzzySearchingMiddlewares<T>;
  }

  interface Query<
    ResultType,
    DocType extends Document<any, {}>,
    THelpers = {}
  > {
    fuzzySearch(
      query: string | MongooseFuzzySearchingParams
    ): Query<ResultType, DocType, THelpers>;
  }

  interface MongooseFuzzySearchingParams {
    query: string;
    minSize?: string;
    prefixOnly?: boolean;
    exact?: boolean;
  }

  interface Model<T extends Document> {
    fuzzySearch(
      query: string | MongooseFuzzySearchingParams
    ): Query<T[], T, {}>;
  }
}

declare module "mongoose-fuzzy-searching";

declare module "mongoose-fuzzy-searching/helpers" {
  export function nGrams(
    query: string,
    escapeSpecialCharacters: boolean,
    defaultNgamMinSize: number,
    checkPrefixOnly: boolean
  ): string[];
}
