import * as rax from 'retry-axios';
import axios from 'axios';
import moment from 'moment';
import { MMKV } from 'react-native-mmkv';
import { store } from '../state/Store';

const BASE_URL = 'http://ab1abe503d37.ngrok.io/api'; // Base URL for the API calls

rax.attach();
const retryConfig = {
	retry: 3,
	noResponseRetries: 3,
	retryDelay: 100,
	statusCodesToRetry: [
		[100, 199],
		[429, 429],
		[500, 599],
		[404, 404],
	],
	backoffType: 'exponential',
	onRetryAttempt: (err) => {
		const cfg = rax.getConfig(err);
		console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
	},
};

const STORAGE_KEY_PREFIX = 'tr_'; // Prefix added to the storage keys
const CACHE_EXPIRATION_MINUTES = 1; // Minutes to consider the cache expired

const API_MODULES = {
	home: {
		// data: array [] of {} EntryModel including all the featured and recent added entries.
		// payload: none
		validateData: (data) => data && Array.isArray(data),
		getURL: (payload) => `${BASE_URL}/entries?page=0&limit=10`, // TODO: Change endpoint
	},
	stats: {
		// data: object {} of statistics (GetStatsFromDatabase)
		// payload: none
		validateData: (data) => data,
		getURL: (payload) => `${BASE_URL}/stats`,
	},
};

/*
	getModuleData: Get data from cache.
	Params:
		apiModule (string): String used to get an API_MODULES object matching by this key (examples: 'home', 'stats')
		payload (object): Passed to the getURL method of apiModule object to build the URL query (examples: {page: 0, limit: 10})
		ignoreCache (bool): To use or not the data saved in local storage
	Return:
		Promise - Resolved with a data object if the server responds and the validateData method of the apiModule object returns true.
*/
export function getModuleData(apiModule, payload, ignoreCache = false) {
	return new Promise((resolve, reject) => {
		const apiModuleStr = apiModule.toLowerCase();

		// Validate apiModule params and get a matching API_MODULES object
		if (apiModuleStr && API_MODULES[apiModuleStr]) {
			const moduleInfo = API_MODULES[apiModuleStr];
			const CACHE_STORAGE_KEY = STORAGE_KEY_PREFIX + apiModuleStr;

			// Try to get cache from local storage
			const cache = MMKV.getString(CACHE_STORAGE_KEY);
			const cacheParsed = cache ? JSON.parse(cache) : null; // Object { data, expirationTime }

			// Check cache expiration time
			let cacheExpired = false;
			if (cacheParsed && cacheParsed.expirationTime) {
				// Get time from cache and calculate seconds remaining
				const cacheMoment = moment(cacheParsed.expirationTime);
				const secondsRemaining = cacheMoment ? cacheMoment.diff(moment(), 'seconds') : 0;
				console.log(`getModuleData ${apiModule}: cache seconds remaining ${secondsRemaining}`);

				if (secondsRemaining <= 0) cacheExpired = true;
			}

			// Check cache validity and fetch from server if it's not valid
			const validCache = !ignoreCache && cacheParsed && !cacheExpired && cacheParsed.data && moduleInfo.validateData(cacheParsed.data);

			if (!validCache) {
				// Cache not valid/expired, get fresh data from server
				console.log('getModuleData: Fetching data from server');

				axios({ url: moduleInfo.getURL(payload), raxConfig: retryConfig })
					.then((result) => {
						const resultData = result.data;
						if (resultData && moduleInfo.validateData(resultData)) {
							const expTime = moment().add(CACHE_EXPIRATION_MINUTES, 'minutes'); // Calculate next expiration time
							MMKV.set(CACHE_STORAGE_KEY, JSON.stringify({ data: resultData, expirationTime: expTime })); // Cache save

							console.log(`Next expiration time for cache data is ${expTime.toString()}`);

							resolve(resultData);
						} else reject(new Error('Data from server is not valid'));
					})
					.catch((error) => {
						// Retry done, server failed so resolve with data from cache ignorning expiration time
						store.dispatch.apiErrorActive.setAPIErrorStatus(true); // Used to display a UI component to notify the user about the error
						console.log(`axios error : ${error}`);
						if (cacheParsed && cacheParsed.data) resolve(cacheParsed.data);
					});

				// TODO: Add reject
			} else resolve(cacheParsed.data); // Cache is still valid, return data from cache
		}
	});
}

export function getEntryData(username) {}
