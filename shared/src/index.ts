// Utility function that returns true when searchText is contained within searchOnString (full word), ignoring case:
export function isMatch(searchOnString: string, searchText: string): boolean {
	searchText = searchText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	return searchOnString.match(new RegExp('\\b' + searchText + '\\b', 'i')) != null;
}
