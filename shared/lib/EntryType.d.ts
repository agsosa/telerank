export declare enum EnumEntryType {
    CHANNEL = "Channel",
    BOT = "Bot",
    GROUP = "Group",
    STICKER = "Sticker"
}
export declare function parseEntryType(str: string): EnumEntryType | undefined;
