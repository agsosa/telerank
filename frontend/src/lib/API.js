import * as rax from 'retry-axios';
import axios from 'axios';
// import axios-retry from 'axios-retry'; // TODO: Implementar axios-retry
import moment from 'moment';
import { MMKV } from 'react-native-mmkv';
import { store } from '../state/Store';

rax.attach();
const retryConfig = {
	// Retry 3 times on requests that return a response (500, etc) before giving up.  Defaults to 3.
	retry: 3,

	// Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
	noResponseRetries: 3,

	// Milliseconds to delay at first.  Defaults to 100. Only considered when backoffType is 'static'
	retryDelay: 100,

	statusCodesToRetry: [
		[100, 199],
		[429, 429],
		[500, 599],
		[404, 404],
	],

	// options are 'exponential' (default), 'static' or 'linear'
	backoffType: 'exponential',

	onRetryAttempt: (err) => {
		const cfg = rax.getConfig(err);
		console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
	},
};

const BASE_URL = 'http://ab1abe503d37.ngrok.io/api';
const STORAGE_KEY_PREFIX = 'tr_';
const CACHE_EXPIRATION_MINUTES = 1;

const API_MODULES = {
	home: {
		// Returned DATA object: array [] of {} EntryModel including all featured and recent added.
		// required payload: none
		validateData: (data) => data && Array.isArray(data),
		getURL: (payload) => `${BASE_URL}/entries?page=0&limit=10`,
	},
	stats: {
		// Returned DATA object: object {} of StatsModel
		validateData: (data) => data,
		getURL: (payload) => `${BASE_URL}/stats`,
	},
};

// getModuleData: Get data from cache or server. Will resolve only if validateData from the apiModule object returns true
export function getModuleData(apiModule, payload, ignoreCache = false) {
	return new Promise((resolve, reject) => {
		const apiModuleStr = apiModule.toLowerCase();

		if (apiModuleStr && API_MODULES[apiModuleStr]) {
			const moduleInfo = API_MODULES[apiModuleStr];
			const CACHE_STORAGE_KEY = STORAGE_KEY_PREFIX + apiModuleStr;

			// Try to get cache from local storage
			const cache = MMKV.getString(CACHE_STORAGE_KEY);
			const cacheParsed = cache ? JSON.parse(cache) : null; // cacheParsed.data, cacheParsed.expirationTime

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
							// Calculate expiration time and save to local storage (cache)
							const expTime = moment().add(CACHE_EXPIRATION_MINUTES, 'minutes');
							MMKV.set(CACHE_STORAGE_KEY, JSON.stringify({ data: resultData, expirationTime: expTime }));

							console.log(`Next expiration time for cache data is ${expTime.toString()}`);

							resolve(resultData);
						} else reject(new Error('Data from server is not valid')); // TODO: Implement axios retry
					})
					.catch((error) => {
						store.dispatch.apiErrorActive.setAPIErrorStatus(true);
						console.log(`axios error : ${error}`);
						if (cacheParsed && cacheParsed.data) resolve(cacheParsed.data);
					});

				// TODO: Add reject
			} else resolve(cacheParsed.data); // Cache is still valid, return data from cache
		}
	});
}

export function getEntryData(username) {}
