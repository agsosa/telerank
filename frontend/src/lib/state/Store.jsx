import React from 'react';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';
import persistPlugin from '@rematch/persist';
import { MMKV } from 'react-native-mmkv';
import * as models from 'lib/state/Models';

export const storage = {
	setItem: (key, value) => {
		MMKV.set(key, value);
		return Promise.resolve(true);
	},
	getItem: (key) => {
		const value = MMKV.getString(key);
		return Promise.resolve(value);
	},
	removeItem: (key) => {
		MMKV.delete(key);
		return Promise.resolve();
	},
};

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['apiErrorActive', 'drawerState'],
};

export const store = init({ models, plugins: [persistPlugin(persistConfig)] });

export default function StoreProvider({ children }) {
	return <Provider store={store}>{children}</Provider>;
}

StoreProvider.propTypes = {
	children: PropTypes.element.isRequired,
};
