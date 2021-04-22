import { EnumEntryType } from 'telerank-shared/lib/EntryType';
import { EnumLanguage } from 'telerank-shared/lib/Language';

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
	state: { collapsed: true, languages: [Object.values(EnumLanguage)], types: Object.values(EnumEntryType), category: ['all'] },
	reducers: {
		toggleCollapsed(state) {
			return { ...state, collapsed: !state.collapsed };
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
	// Used to manage the drawer state from different components/screens
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
