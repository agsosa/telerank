// TODO: Convert to TypeScript enums

export const Categories = Object.freeze({
	ANIMALS: { es: 'Otros', en: 'Animals' },
	EDUCATION: { es: 'Otros', en: 'Education' },
	OTHER: { es: 'Otros', en: 'Other' },
	ART_DESIGN: { es: 'Otros', en: 'Art & Design' },
	ENTERTAINMENT: { es: 'Otros', en: 'Entertainment' },
	PHOTO: { es: 'Otros', en: 'Photo' },
	AUTO_MOTO: { es: 'Otros', en: 'Auto & Moto' },
	FASHION_BEAUTY: { es: 'Otros', en: 'Fashion & Beauty' },
	SCIENCE: { es: 'Otros', en: 'Science' },
	BETTING: { es: 'Otros', en: 'Betting' },
	FOOD: { es: 'Otros', en: 'Food' },
	SELF_DEVELOPMENT: { es: 'Otros', en: 'Self Development' },
	BLOGS: { es: 'Blogs', en: 'Blogs' },
	GAMES_APPS: { es: 'Blogs', en: 'Games & Apps' },
	SHOP: { es: 'Blogs', en: 'Shop' },
	BOOKS_MAGAZINE: { es: 'Blogs', en: 'Books & Magazine' },
	HEALTH: { es: 'Blogs', en: 'Health' },
	SPORTS_FITNESS: { es: 'Blogs', en: 'Sports & Fitness' },
	BUSINESS_STARTUPS: { es: 'Blogs', en: 'Business & Startups' },
	LANGUAGES: { es: 'Blogs', en: 'Languages' },
	TECHNOLOGY: { es: 'Blogs', en: 'Technology' },
	CELEBRITIES: { es: 'Blogs', en: 'Celebrities' },
	LOVE: { es: 'Blogs', en: 'Love' },
	TELEGRAM: { es: 'Blogs', en: 'Telegram' },
	COMMUNICATION: { es: 'Blogs', en: 'Communication' },
	MARKETING: { es: 'Blogs', en: 'Marketing' },
	TRAVEL: { es: 'Blogs', en: 'Travel' },
	CRYPTOCURRENCIES: { es: 'Criptomonedas', en: 'Cryptocurrencies' },
	MUSIC: { es: 'Blogs', en: 'Music' },
	UTILITIES_TOOLS: { es: 'Blogs', en: 'Utilities & Tools' },
	ECONOMICS_FINANCE: { es: 'Blogs', en: 'Economics & Finance' },
	NEWS_MEDIA: { es: 'Blogs', en: 'News & Media' },
	VIDEOS_MOVIES: { es: 'Blogs', en: 'Videos & Movies' },
});

/*
 * Accepts a Categories object key (i.e. "NEWS_MEDIA")
 * Returns a locale object (i.e. {es: "...", en: "..."})
 * Case insensitive
 */
export function getLocaleObjectFromCategory(category) {
	if (category && typeof category == 'string') {
		return Categories[category];
	}
	return undefined;
}

/*
 * Accepts a locale string (i.e. "Videos & Movies")
 * Returns a Categories key (i.e. "NEWS_MEDIA")
 * Case insensitive
 */
export function getCategoryFromLocaleString(localeStr) {
	if (localeStr && typeof localeStr == 'string') {
		const keys = Object.keys(Categories);
		const str = localeStr.toLowerCase();
		return keys.find((q) => Categories[q].es.toLowerCase() === str || Categories[q].en.toLowerCase() === str);
	}
	return undefined;
}
