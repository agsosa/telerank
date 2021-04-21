import { Languages } from 'lib/locale/Locale';

export const settings = {
	name: 'settings',
	state: { hiddenComponentKeys: [] },
	reducers: {
		addHiddenComponentKey(state, payload) {
			// Payload: string
			return !state.hiddenComponentKeys.includes(payload) ? { ...state, hiddenComponentKeys: [...state.hiddenComponentKeys, payload] } : state;
		},
	},
};

export const currentFilters = {
	name: 'currentFilters',
	state: { collapsed: true, languages: [Languages.map((q) => q.displayStr)], types: ['channel', 'bot', 'sticker', 'group'], category: ['all'] },
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