const latinize = require('latinize');
import { isMatch } from './index';

export type TCategoryLocale = Record<string, string>;
type TCategories = Record<string, TCategoryLocale>;

export const Categories: TCategories = Object.freeze({
	ANIMALS: { es: 'Animales', en: 'Animals' },
	EDUCATION: { es: 'Educación', en: 'Education' },
	OTHER: { es: 'Otros', en: 'Other' },
	ART_DESIGN: { es: 'Arte y Diseño', en: 'Art & Design' },
	ENTERTAINMENT: { es: 'Entretenimiento', en: 'Entertainment' },
	PHOTO: { es: 'Foto', en: 'Photo' },
	AUTO_MOTO: { es: 'Auto & Moto', en: 'Auto & Moto' },
	FASHION_BEAUTY: { es: 'Moda y belleza', en: 'Fashion & Beauty' },
	SCIENCE: { es: 'Ciencia', en: 'Science' },
	BETTING: { es: 'Apuesta', en: 'Betting' },
	FOOD: { es: 'Comida', en: 'Food' },
	SELF_DEVELOPMENT: { es: 'Autodesarrollo', en: 'Self Development' },
	BLOGS: { es: 'Blogs', en: 'Blogs' },
	GAMES_APPS: { es: 'Juegos y apps', en: 'Games & Apps' },
	SHOP: { es: 'Comprar', en: 'Shop' },
	BOOKS_MAGAZINE: { es: 'Libros y revistas', en: 'Books & Magazine' },
	HEALTH: { es: 'Salud', en: 'Health' },
	SPORTS_FITNESS: { es: 'Deporte y Fitness', en: 'Sports & Fitness' },
	BUSINESS_STARTUPS: { es: 'Negocios y Startups', en: 'Business & Startups' },
	LANGUAGES: { es: 'Idiomas', en: 'Languages' },
	TECHNOLOGY: { es: 'Tecnología', en: 'Technology' },
	CELEBRITIES: { es: 'Famosos', en: 'Celebrities' },
	LOVE: { es: 'Amor', en: 'Love' },
	TELEGRAM: { es: 'Telegram', en: 'Telegram' },
	COMMUNICATION: { es: 'Comunicación', en: 'Communication' },
	MARKETING: { es: 'Marketing', en: 'Marketing' },
	TRAVEL: { es: 'Viajes', en: 'Travel' },
	CRYPTOCURRENCIES: { es: 'Criptomonedas', en: 'Cryptocurrencies' },
	MUSIC: { es: 'Música', en: 'Music' },
	UTILITIES_TOOLS: {
		es: 'Utilidades y Herramientas',
		en: 'Utilities & Tools',
	},
	ECONOMICS_FINANCE: { es: 'Economía y Finanzas', en: 'Economics & Finance' },
	NEWS_MEDIA: { es: 'Noticias y Medios', en: 'News & Media' },
	VIDEOS_MOVIES: { es: 'Videos y peliculas', en: 'Videos & Movies' },
	NO_CATEGORY: { es: 'Sin categorizar', en: 'Uncategorized' },
});

/*
 * Accepts a Categories object key (i.e. "NEWS_MEDIA")
 * Returns a locale object (i.e. {es: "...", en: "..."})
 * Case insensitive
 */
export function getLocaleObjectFromCategory(category: string): TCategoryLocale {
	if (category) return Categories[category.toUpperCase()] || Categories['NO_CATEGORY'];
	else return Categories['NO_CATEGORY'];
}

/*
 * Accepts a locale string (i.e. "Videos & Movies")
 * Returns a Categories key (i.e. "NEWS_MEDIA")
 * Case insensitive, ignores accents
 */
export function getCategoryFromLocaleString(localeStr: string): string {
	if (localeStr) {
		const keys = Object.keys(Categories);
		const str = latinize(localeStr.toLowerCase().trim()); // Remove blank spaces at extreme, convert to lower case and remove accents
		// TODO: Use regex or something to make the comparisons more flexible (i.e. possibility to convert "News" or "Media News" to the NEWS_MEDIA category)
		return keys.find((q) => isMatch(latinize(Categories[q].es.toLowerCase()), str) || isMatch(latinize(Categories[q].en.toLowerCase()), str)) || 'NO_CATEGORY';
	}
	return 'NO_CATEGORY';
}
