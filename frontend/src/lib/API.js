import * as rax from 'retry-axios';
import axios from 'axios';
import moment from 'moment';
import { MMKV } from 'react-native-mmkv';
import { store } from '../state/Store';

// Base URL for the API calls
const BASE_URL = 'http://c3f3638452f7.ngrok.io';

// Retry config
const PROMISE_RETRY_TIMEOUT = 3000; // Wait time to retry the promise after failing all retry-axios attempts
rax.attach();
const retryConfig = {
	retry: 3,
	noResponseRetries: 3,
	retryDelay: 3000,
	statusCodesToRetry: [
		[100, 199],
		[429, 429],
		[500, 599],
		[404, 404],
	],
	backoffType: 'static',
	onRetryAttempt: (err) => {
		const cfg = rax.getConfig(err);
		console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
	},
};

// Cache
const STORAGE_KEY_PREFIX = 'tr_'; // Prefix added to the storage keys
const CACHE_EXPIRATION_MINUTES = 3; // Minutes to consider the cache expired

const API_MODULES = {
	featured: {
		validateData: (data) => data && Array.isArray(data), // data: array [] of {} EntryModel including all the featured and recent added entries.
		current: null, // loaded object from server or file storage { data, expirationTime}
		pendingPromise: null, // prevent concurrent promises
		getURL: () => `${BASE_URL}/entries/featured`, // API URL
	},
	recent: {
		validateData: (data) => data && Array.isArray(data),
		current: null,
		pendingPromise: null,
		getURL: () => `${BASE_URL}/entries/recent`,
	},
	popular: {
		validateData: (data) => data && Array.isArray(data),
		current: null,
		pendingPromise: null,
		getURL: () => `${BASE_URL}/entries/popular`,
	},
	biggest: {
		validateData: (data) => data && Array.isArray(data),
		current: null,
		pendingPromise: null,
		getURL: () => `${BASE_URL}/entries/biggest`,
	},
	top: {
		validateData: (data) => data && Array.isArray(data),
		current: null,
		pendingPromise: null,
		getURL: () => `${BASE_URL}/entries/top`,
	},
	stats: {
		validateData: (data) => data,
		currentData: null,
		pendingPromise: null,
		getURL: () => `${BASE_URL}/stats`,
	},
	channels: {
		validateData: (data) => data && Array.isArray(data),
		currentData: null,
		pendingPromise: null,
		getURL: (payload) => `${BASE_URL}/entries?type=Channel&page=0`,
	},
	bots: {
		validateData: (data) => data && Array.isArray(data),
		currentData: null,
		pendingPromise: null,
		getURL: (payload) => `${BASE_URL}/entries?type=Bot&page=0`,
	},
	stickers: {
		validateData: (data) => data && Array.isArray(data),
		currentData: null,
		pendingPromise: null,
		dataPostProcess: null,
		getURL: (payload) => `${BASE_URL}/entries?type=Sticker&page=0`,
	},
	groups: {
		validateData: (data) => data && Array.isArray(data),
		currentData: null,
		pendingPromise: null,
		getURL: (payload) => `${BASE_URL}/entries?type=Group&page=0`,
	},
	random: {
		validateData: (data) => data && Array.isArray(data) && data.length >= 1,
		currentData: null,
		pendingPromise: null,
		getURL: () => `${BASE_URL}/entries/random`,
	},
	search: {
		validateData: (data) => data && Array.isArray(data),
		currentData: null,
		pendingPromise: null,
		getURL: (payload) => `${BASE_URL}/entries?type=${payload.type}&search=${payload.search}`,
	},
};

function getCacheFromStorage(storageKey) {
	try {
		const cacheParsed = JSON.parse(MMKV.getString(storageKey)); // TODO: Benchmark
		return cacheParsed;
	} catch (e) {
		console.log(`Error while trying to get data from memory/storage: ${e.message}`);
		return undefined;
	}
}

function getCacheSecondsRemaining(cacheParsed) {
	if (cacheParsed && cacheParsed.expirationTime) {
		const cacheMoment = moment(cacheParsed.expirationTime);
		const secondsRemaining = cacheMoment ? cacheMoment.diff(moment(), 'seconds') : 0;
		return secondsRemaining;
	}
	return 0;
}

/*
	getModuleData: Get data from cache (memory/storage) or server.
	Params:
		apiModule (string): String used to get an API_MODULES object matching by key (examples: 'home', 'stats')
		payload (object): Passed to the getURL method of apiModule object to build the URL query (examples: {page: 0, limit: 10})
		ignoreCache (bool): To use or not the data saved in local storage
	Return:
		Promise - Always (no timeout, no retry limit) resolve with a data object validated with the validateData method of the apiModule object
*/
export function getModuleData(apiModule, payload = {}, ignoreCache = false) {
	const apiModuleStr = apiModule.toLowerCase();
	const moduleInfo = API_MODULES[apiModuleStr];

	if (moduleInfo.pendingPromise) return moduleInfo.pendingPromise; // Prevent concurrent promises/race condition for the same api module

	moduleInfo.pendingPromise = new Promise(function cb(resolve, reject) {
		console.log(`Running promise for ${apiModuleStr}`);

		// Try to get data from local storage or memory
		const storageKey = STORAGE_KEY_PREFIX + apiModuleStr;
		let cacheParsed;
		if (!ignoreCache) {
			if (moduleInfo.current && moduleInfo.current.data && moduleInfo.current.expirationTime) {
				// Load from memory
				console.log('Loaded from memory');
				cacheParsed = moduleInfo.current;
			} else {
				// Load from local storage
				console.log('Loaded from Storage');
				cacheParsed = getCacheFromStorage(storageKey, moduleInfo);
				moduleInfo.current = cacheParsed;
			}
		}
		// Check cache expiration time
		const cacheExpired = getCacheSecondsRemaining(cacheParsed) <= 0;

		// Check cache validity
		const validCache = !ignoreCache && cacheParsed && !cacheExpired && moduleInfo.validateData(cacheParsed.data);

		if (!validCache) {
			// Invalid cache, fetch data from server
			console.log('getModuleData: Fetching data from server');
			const axiosOptions = { url: moduleInfo.getURL(payload), raxConfig: retryConfig };
			axios(axiosOptions) // Cache not valid/expired, get fresh data from server
				.then((result) => {
					const { data } = result;
					if (moduleInfo.validateData(data)) {
						// Save data to storage (cache) and resolve the promise
						const expTime = moment().add(CACHE_EXPIRATION_MINUTES, 'minutes'); // Calculate the next expiration time
						const obj = { data, expirationTime: expTime };
						// Save data to local storage
						MMKV.set(storageKey, JSON.stringify(obj));
						// Save to memory to prevent unnecessary storage reads
						moduleInfo.current = obj;
						resolve(data);
					} else setTimeout(() => cb(resolve, reject), PROMISE_RETRY_TIMEOUT); // Retry promise if the server returned invalid data
				})
				.catch((error) => {
					// Retries done, server failed. Resolve with the data from cache if it's available.
					store.dispatch.apiErrorActive.setAPIErrorStatus(true); // Used to display a UI component to notify the user about the error
					console.log(`axios error : ${error}`);
					if (cacheParsed && cacheParsed.data) resolve(cacheParsed.data);
					else if (!ignoreCache) setTimeout(() => cb(resolve, reject), PROMISE_RETRY_TIMEOUT);
					// Retry promise if cache is invalid
					else reject(new Error("Couldn't fetch from the server and no data was found on the storage."));
				});
		} else {
			// Cache is still valid, return data from cache
			resolve(cacheParsed.data);
		}
	}).finally((data) => {
		moduleInfo.pendingPromise = null;
		return data;
	});

	return moduleInfo.pendingPromise;
}

export function getEntryExtraData(id) {
	// Return: { description, comments } for id
}
