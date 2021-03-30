import React from 'react';
import { getTranslatedCategory, getTranslatedType } from '../config/Locale';
import { placeholderImage } from '../config/Styles';

export function useIsMounted() {
	const ref = React.useRef(true);
	React.useEffect(
		() => () => {
			ref.current = false;
		},
		[]
	);
	return React.useCallback(() => ref.current, []);
}

export function formatLanguageCode(langCode) {
	switch (langCode) {
		case 'es':
			return 'Español';
		case 'en':
			return 'English';
		default:
			return langCode;
	}
}

export function getEntrySubtitle(data) {
	return `${getTranslatedType(data.type)} / ${getTranslatedCategory(data.category)} / ${formatLanguageCode(data.language)}`;
}

// Slice long strings and add ... at the end
export function truncateWithEllipses(str, max, add) {
	const x = add || '...';
	return typeof str === 'string' && str.length > max ? str.substring(0, max) + x : str;
}

// Format a big number (i.e. 100000) to 100k
export function formattedNumber(num, digits = 1) {
	const si = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: 'k' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e9, symbol: 'G' },
		{ value: 1e12, symbol: 'T' },
		{ value: 1e15, symbol: 'P' },
		{ value: 1e18, symbol: 'E' },
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	let i;
	for (i = si.length - 1; i > 0; i--) {
		if (num >= si[i].value) {
			break;
		}
	}
	return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
}

export function isNumber(n) {
	return !Number.isNaN(parseFloat(n)) && !Number.isNaN(n - 0);
}

/*
	Function to check if a entry's image field is valid.
	If it's valid -> return a object with the uri to use on a image component
	If it's not valid -> return a placeholder image
*/
export function resolveImage(entryData) {
	const imageSrc = entryData && entryData.image && entryData.image.includes('storage.googleapis') ? { uri: entryData.image } : placeholderImage;
	return imageSrc;
}
