import * as rax from 'retry-axios';
import axios from 'axios';
import moment from 'moment';
import { MMKV } from 'react-native-mmkv';
import { store } from '../state/Store';

const BASE_URL = 'http://a20a49778015.ngrok.io/api'; // Base URL for the API calls

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
const CACHE_EXPIRATION_MINUTES = 3; // Minutes to consider the cache expired
const PROMISE_RETRY_TIMEOUT = 1000;

const API_MODULES = {
	home: {
		validateData: (data) => data && Array.isArray(data), // data: array [] of {} EntryModel including all the featured and recent added entries.
		currentData: null, // loaded data from server or cache to prevent unnecessary storage reads
		pendingPromise: null, // prevent concurrent promises
		getURL: () => `${BASE_URL}/entries?page=0&limit=5`, // endpoint/query
	},
	stats: {
		validateData: (data) => data, // data: object {} of statistics (GetStatsFromDatabase)
		currentData: null,
		pendingPromise: null,
		getURL: () => `${BASE_URL}/stats`,
	},
	// search, top, groups, channels, bots, stickers
};

/*
	getModuleData: Get data from cache (memory/storage) or server.
	Params:
		apiModule (string): String used to get an API_MODULES object matching by key (examples: 'home', 'stats')
		payload (object): Passed to the getURL method of apiModule object to build the URL query (examples: {page: 0, limit: 10})
		ignoreCache (bool): To use or not the data saved in local storage
	Return:
		Promise - Always (no timeout, no retry limit) resolve with a data object validated with the validateData method of the apiModule object
*/
export function getModuleData(apiModule = 'stats', payload = {}, ignoreCache = false) {
	const apiModuleStr = apiModule.toLowerCase();
	const moduleInfo = API_MODULES[apiModuleStr];

	if (moduleInfo.pendingPromise) return moduleInfo.pendingPromise; // Prevent concurrent promises/race condition for the same api module

	moduleInfo.pendingPromise = new Promise(function cb(resolve, reject) {
		console.log(`Running promise for ${apiModuleStr}`);

		const CACHE_STORAGE_KEY = STORAGE_KEY_PREFIX + apiModuleStr;
		let cacheExpired = false;
		let cacheParsed = null;

		// Try to get cache from memory or local storage
		try {
			if (moduleInfo.currentData && moduleInfo.currentData.data && moduleInfo.currentData.expirationTime) {
				// Load from memory first if possible
				console.log('loaded from memory');
				cacheParsed = moduleInfo.currentData;
			} else {
				// Load from storage
				cacheParsed = JSON.parse(MMKV.getString(CACHE_STORAGE_KEY));
				moduleInfo.currentData = cacheParsed;
			}

			// CacheParsed and moduleInfo.currentData should be object { data, expirationTime }

			// Check cache expiration time
			if (cacheParsed && cacheParsed.expirationTime) {
				// Calculate cache expiration seconds remaining and determine if it's expired
				const cacheMoment = moment(cacheParsed.expirationTime);
				const secondsRemaining = cacheMoment ? cacheMoment.diff(moment(), 'seconds') : 0;
				if (secondsRemaining <= 0) cacheExpired = true;
			}
		} catch (e) {
			console.log(`Error while trying to get data from memory/storage: ${e.message}`);
		}

		// Check cache validity and fetch from server if it's not valid
		const validCache = !ignoreCache && cacheParsed && !cacheExpired && cacheParsed.data && moduleInfo.validateData(cacheParsed.data);

		if (!validCache) {
			console.log('getModuleData: Fetching data from server');
			const axiosOptions = { url: moduleInfo.getURL(payload), raxConfig: retryConfig };
			axios(axiosOptions) // Cache not valid/expired, get fresh data from server
				.then((result) => {
					const resultData = result.data;
					if (resultData && moduleInfo.validateData(resultData)) {
						// Save data to storage (cache) and resolve the promise
						const expTime = moment().add(CACHE_EXPIRATION_MINUTES, 'minutes'); // Calculate next expiration time
						const obj = { data: resultData, expirationTime: expTime };
						MMKV.set(CACHE_STORAGE_KEY, JSON.stringify(obj)); // Cache save
						moduleInfo.currentData = obj; // Save to memory to prevent unnecessary storage reads
						resolve(resultData);
					} else setTimeout(() => cb(resolve, reject), PROMISE_RETRY_TIMEOUT); // Retry promise if server returned invalid data
				})
				.catch((error) => {
					// Retry done, server failed. Resolve with the data from cache if it's available.
					store.dispatch.apiErrorActive.setAPIErrorStatus(true); // Used to display a UI component to notify the user about the error
					console.log(`axios error : ${error}`);
					if (cacheParsed && cacheParsed.data) resolve(cacheParsed.data);
					else setTimeout(() => cb(resolve, reject), PROMISE_RETRY_TIMEOUT); // Retry promise if cache is invalid
				});
		} else resolve(cacheParsed.data); // Cache is still valid, return data from cache
	}).then((data) => {
		moduleInfo.pendingPromise = null;
		return data;
	});

	return moduleInfo.pendingPromise;
}

export function getEntryExtraData(id) {
	// Return: { description, comments } for id
}
