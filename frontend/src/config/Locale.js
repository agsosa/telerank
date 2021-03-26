import React, { useEffect } from 'react';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import * as RNLocalize from 'react-native-localize';
import { I18nManager } from 'react-native';
import { connect } from 'react-redux';
import en from './locales/en';
import es from './locales/es';

i18n.missingTranslation = () => undefined;

export const Languages = [
	{ code: 'en', displayStr: 'English' },
	{ code: 'es', displayStr: 'Español' },
];

export const translate = memoize(
	(key, config) => i18n.t(key, config),
	(key, config) => (config ? key + JSON.stringify(config) : key)
);

export const getBestAvailableLanguage = () => RNLocalize.findBestAvailableLanguage(Languages.map((q) => q.code));

const setI18nConfig = (forceLanguage = null) => {
	const fallback = { languageTag: 'en', isRTL: false };

	const { languageTag, isRTL } = { languageTag: forceLanguage, isRTL: false } || getBestAvailableLanguage() || fallback;

	translate.cache.clear();
	I18nManager.forceRTL(isRTL);

	i18n.translations = {
		en,
		es,
	};

	i18n.defaultLocale = 'en';
	i18n.fallbacks = true;
	i18n.locale = languageTag;
};

export const getLocalizedLegalURLS = () => ({
	dmca: `https://telerank.netlify.app/dmca_${i18n.locale}`,
	tos: `https://telerank.netlify.app/tos_${i18n.locale}`,
	privacy: `https://telerank.netlify.app/privacy_${i18n.locale}`,
});

const Locale = ({ language }) => {
	// Use this component to initialize and update locale

	const handleLocalizationChange = () => {
		setI18nConfig();
	};

	useEffect(() => {
		RNLocalize.addEventListener('change', handleLocalizationChange);
		setI18nConfig();

		return () => RNLocalize.removeEventListener('change', handleLocalizationChange);
	}, []);

	useEffect(() => {
		setI18nConfig(language);
	}, [language]);

	return null;
};

const mapStateToProps = ({ settings }) => ({
	language: settings.language,
});

export default connect(mapStateToProps)(Locale);
