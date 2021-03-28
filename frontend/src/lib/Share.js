import i18next from 'i18next';
import { Share, Platform, Linking } from 'react-native';

export const STORE_URL = Platform.OS === 'android' ? 'https://play.google.com/store/apps/details?id=app.telerank' : ''; // TODO: Add ios store url

export const RateApp = () => {
	Linking.openURL(STORE_URL);
};

export const ShareApp = () => {
	try {
		Share.share({
			url: STORE_URL,
			message: i18next.t('shareMessage', { url: STORE_URL }),
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const ShareTelegram = (username) => {
	try {
		const tgUrl = `https://t.me/${username}`;
		Share.share({
			url: tgUrl,
			message: i18next.t('shareTelegramUser', { tgUrl, username, storeUrl: STORE_URL }),
		});
	} catch (error) {
		console.log(error.message);
	}
};
