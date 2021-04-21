export declare enum EnumEntryType {
    CHANNEL = "Channel",
    BOT = "Bot",
    GROUP = "Group",
    STICKER = "Sticker"
}
export declare function parseEntryType(str: string): EnumEntryType | undefined;
export declare type TCategoryLocale = Record<string, string>;
declare type TCategories = Record<string, TCategoryLocale>;
export declare const Categories: TCategories;
export declare function getLocaleObjectFromCategory(category: string): TCategoryLocale;
export declare function getCategoryFromLocaleString(localeStr: string): string;
export {};
