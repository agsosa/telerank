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
  let result = undefined;

  if (str) {
    const strEx = pluralize.singular(str).toLowerCase();
    Object.values(EnumEntryType).forEach((v) => {
      if (strEx === v.toLowerCase()) {
        result = v;
      }
    });
  }

  return result;
}

export default EnumEntryType;
