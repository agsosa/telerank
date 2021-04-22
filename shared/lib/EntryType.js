"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEntryType = exports.EnumEntryType = void 0;
const pluralize = require('pluralize');
var EnumEntryType;
(function (EnumEntryType) {
    EnumEntryType["CHANNEL"] = "Channel";
    EnumEntryType["BOT"] = "Bot";
    EnumEntryType["GROUP"] = "Group";
    EnumEntryType["STICKER"] = "Sticker";
})(EnumEntryType = exports.EnumEntryType || (exports.EnumEntryType = {}));
// Will try to get a EnumEntryType from a str (accepts any string, plurar or singular, uppercase or lowercase). Returns undefined if it couldn't parse the string.
function parseEntryType(str) {
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
exports.parseEntryType = parseEntryType;
//# sourceMappingURL=EntryType.js.map