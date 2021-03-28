import { getLocales } from 'react-native-localize';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { MMKV } from 'react-native-mmkv';
import en from './locales/en';
import es from './locales/es';

export const getLocalizedLegalURLS = () => ({
	dmca: `https://telerank.netlify.app/dmca_${i18n.language}`,
	tos: `https://telerank.netlify.app/tos_${i18n.language}`,
	privacy: `https://telerank.netlify.app/privacy_${i18n.language}`,
});

export const Languages = [
	{ code: 'en', displayStr: 'English' },
	{ code: 'es', displayStr: 'Español' },
];

export const getCurrentLanguageDisplay = () => {
	const langObj = Languages.find((q) => q.code === i18n.language);
	const langDisplay = langObj ? langObj.displayStr : 'Undefined';
	return langDisplay;
};

const resources = {
	en,
	es,
};

const LanguageDetector = {
	type: 'languageDetector',
	async: false,
	init() {},
	detect() {
		const locale = Languages.find((q) => q.code === getLocales()[0].languageCode).code || 'en';
		return MMKV.getString('TR_Lng') || locale;
	},
	cacheUserLanguage(lng) {
		MMKV.set('TR_Lng', lng);
	},
};

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		resources,
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
