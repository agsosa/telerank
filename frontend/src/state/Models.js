import { Languages, getBestAvailableLanguage } from '../config/Locale';

export const settings = {
	name: 'settings',
	state: { hiddenComponentKeys: [], language: getBestAvailableLanguage().languageTag },
	reducers: {
		addHiddenComponentKey(state, payload) {
			// Payload: string
			return !state.hiddenComponentKeys.includes(payload) ? { ...state, hiddenComponentKeys: [...state.hiddenComponentKeys, payload] } : state;
		},
		setLanguage(state, payload) {
			// Payload: string, language code
			const isPayloadValid = payload && typeof payload === 'string' && Languages.some((q) => q.code === payload);
			return isPayloadValid ? { ...state, language: payload } : state;
		},
	},
};

export const currentFilters = {
	name: 'currentFilters',
	state: { collapsed: true, languages: [getBestAvailableLanguage().languageTag], types: ['channel', 'bot', 'sticker', 'group'], category: ['all'] },
	reducers: {
		setFilters(state, payload) {
			// Payload: Object
			return payload && payload instanceof Object ? { ...state, payload } : state;
		},
	},
};

export const apiErrorActive = {
	// Used to display an error component when the API fails to request data from server
	name: 'apiErrorActive',
	state: false,
	reducers: {
		setAPIErrorStatus(state, payload) {
			// Payload: bool
			return typeof payload === 'boolean' ? payload : state;
		},
	},
};

export const drawerState = {
	// Manage the drawer state
	name: 'drawerState',
	state: { navigation: null, isOpen: false },
	reducers: {
		setIsOpen(state, payload) {
			// Payload: bool
			return typeof payload === 'boolean' ? { ...state, isOpen: payload } : state;
		},
		setNavigation(state, payload) {
			// Payload: react navigation object
			return payload instanceof Object ? { ...state, navigation: payload } : state;
		},
	},
};

/* export const media = {
	name: 'media',
	state: [],
	reducers: {
		clear: () => {
			console.log('clear');
			return [];
		}, // Clear the current media list array
		set: (_, payload) => Array.isArray(payload) && payload, // Replace the current media list array
	},
	effects: (dispatch) => ({
		async getFromServerAsync(apiFunc, state) {
			dispatch.media.clear();
			apiFunc().then((data) => {
				console.log(`received model ${Date.now()}`);
				dispatch.media.set(data);
			});
		},
	}),
}; */
