import { Share, Platform, Linking } from 'react-native';

export const STORE_URL = Platform.OS === 'android' ? 'https://play.google.com/store/apps/details?id=app.telerank' : ''; // TODO: Add ios store url

export const RateApp = () => {
	Linking.openURL(STORE_URL);
};

export const ShareApp = () => {
	try {
		Share.share({
			url: STORE_URL,
			message: `Telerank - Find new Telegram Channels, Groups, Bots and Stickers. Get the app on the Playstore! ${STORE_URL}`,
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
			message: `@${username} is on Telegram! ${tgUrl}`,
		});
	} catch (error) {
		console.log(error.message);
	}
};
