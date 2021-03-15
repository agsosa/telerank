import pluralize from "pluralize";

/*eslint-disable */
enum EnumEntryType {
  CHANNEL = "Channel",
  BOT = "Bot",
  GROUP = "Group",
  STICKER = "Sticker",
}

// Will try to get a EnumEntryType from a str (accepts any string, plurar or singular, uppercase or lowercase). Returns undefiend if it couldn't parse the string.
export function parseEntryType(str: string): EnumEntryType | undefined {
  if (str) {
    const strEx = pluralize.singular(str).toLowerCase();
    // eslint-disable-next-line
    Object.entries(EnumEntryType).forEach((v) => {
      if (strEx === v[0].toLowerCase()) return v[1];
    });
  }

  return undefined;
}

export default EnumEntryType;
