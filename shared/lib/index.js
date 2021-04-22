"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMatch = void 0;
// Utility function that returns true when searchText is contained within searchOnString (full word), ignoring case:
function isMatch(searchOnString, searchText) {
    searchText = searchText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return searchOnString.match(new RegExp('\\b' + searchText + '\\b', 'i')) != null;
}
exports.isMatch = isMatch;
//# sourceMappingURL=index.js.map