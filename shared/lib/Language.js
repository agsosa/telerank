"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLanguage = exports.EnumLanguage = void 0;
var EnumLanguage;
(function (EnumLanguage) {
    EnumLanguage["SPANISH"] = "es";
    EnumLanguage["ENGLISH"] = "en";
})(EnumLanguage = exports.EnumLanguage || (exports.EnumLanguage = {}));
// Will try to get a EnumLanguage from a str. Returns undefined  if it couldn't parse the string.
function parseLanguage(str) {
    if (str) {
        switch (str.toLowerCase()) {
            case 'ingles':
            case 'en':
            case 'english':
            case 'inglés':
                return EnumLanguage.ENGLISH;
            case 'es':
            case 'spanish':
            case 'español':
            case 'espanol':
            case 'espaniol':
                return EnumLanguage.SPANISH;
            default:
                return undefined;
        }
    }
    return undefined;
}
exports.parseLanguage = parseLanguage;
//# sourceMappingURL=Language.js.map