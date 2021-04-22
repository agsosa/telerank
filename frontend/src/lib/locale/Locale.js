/* 

	Note: call initializeLocale() as soon as possible on app startup to configure i18next
*/

import { getLocales } from 'react-native-localize';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { MMKV } from 'react-native-mmkv';
import { getLocaleObjectFromCategory } from 'telerank-shared/lib/Category';
import en from 'lib/locale/en';
import es from 'lib/locale/es';
import { EnumLanguage } from 'telerank-shared/lib/Language';

export const getLocalizedLegalURLS = () => ({
	dmca: `https://telerank.netlify.app/dmca_${i18n.language}`,
	tos: `https://telerank.netlify.app/tos_${i18n.language}`,
	privacy: `https://telerank.netlify.app/privacy_${i18n.language}`,
});

export const getTranslatedLanguage = (languageEnum) => {
	switch (languageEnum) {
		case EnumLanguage.ENGLISH:
			return 'English';
		case EnumLanguage.SPANISH:
			return 'Español';
		default:
			return languageEnum;
	}
};

export const getCurrentLanguageDisplay = () => {
	return getTranslatedLanguage(i18n.language);
};

export const getTranslatedCategory = (categoryEnum) => {
	const locale = getLocaleObjectFromCategory(categoryEnum);
	const result = locale[i18n.language];
	return result || locale.en;
};

export const getTranslatedEntryType = (entryTypeEnum) => i18n.t(entryTypeEnum.toLowerCase());

// initializeLocale: Called automatically on file import. Import this file on app startup to initialize i18next as soon as possible
(function initializeLocale() {
	// Custom i18next LanguageDetector plugin using MMKV for persistence
	const LanguageDetector = {
		type: 'languageDetector',
		async: false,
		init() {},
		detect() {
			const locale = Object.values(EnumLanguage).find((q) => q === getLocales()[0].languageCode) || EnumLanguage.ENGLISH;
			return MMKV.getString('TR_Lng') || locale;
		},
		cacheUserLanguage(lng) {
			MMKV.set('TR_Lng', lng);
		},
	};

	const resources = {
		en,
		es,
	};

	i18n
		.use(initReactI18next)
		.use(LanguageDetector)
		.init({
			resources,
			fallbackLng: EnumLanguage.ENGLISH,
			interpolation: {
				escapeValue: false,
			},
		});
})();
