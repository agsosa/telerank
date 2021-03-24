import * as rax from 'retry-axios';
import axios from 'axios';
import moment from 'moment';
import { MMKV } from 'react-native-mmkv';
import { store } from '../state/Store';

// Base URL for the API calls
const BASE_URL = 'http://19add10c22c3.ngrok.io';

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
const CACHE_EXPIRATION_MINUTES = 15; // Minutes to consider the cache expired
const PAGINATED_IGNORE_CACHE = true; // Ignore cache for all paginated api modules?

const API_MODULES = {
	featured: {
		validateData: (data) => data && Array.isArray(data), // boolean func to validate the data
		current: null, // loaded object from server or file storage { data, expirationTime}, used when cache = true
		pendingPromise: null, // to prevent concurrent promises
		isPaginated: false, // use pages?
		ignoreCache: false, // Set ignoreCache: true to not use the local storage/memory cache for a particular api module
		getURL: () => `${BASE_URL}/entries/featured`, // API URL, this function can receive a payload object to add query parameters
	},
	recent: {
		validateData: (data) => data && Array.isArray(data),
		current: null,
		pendingPromise: null,
		isPaginated: false,
		getURL: () => `${BASE_URL}/entries/recent`,
	},
	popular: {
		validateData: (data) => data && Array.isArray(data),
		current: null,
		pendingPromise: null,
		isPaginated: false,
		getURL: () => `${BASE_URL}/entries/popular`,
	},
	biggest: {
		validateData: (data) => data && Array.isArray(data),
		current: null,
		pendingPromise: null,
		isPaginated: false,
		getURL: () => `${BASE_URL}/entries/biggest`,
	},
	top: {
		validateData: (data) => data && Array.isArray(data),
		current: null,
		pendingPromise: null,
		isPaginated: false,
		getURL: () => `${BASE_URL}/entries/top`,
	},
	stats: {
		validateData: (data) => data,
		currentData: null,
		pendingPromise: null,
		isPaginated: false,
		getURL: () => `${BASE_URL}/stats`,
	},
	channels: {
		validateData: (data) => data && Array.isArray(data),
		currentData: null,
		pendingPromise: null,
		isPaginated: true,
		getURL: (payload) => `${BASE_URL}/entries?type=Channel&page=${payload.page || 0}`,
	},
	bots: {
		validateData: (data) => data && Array.isArray(data),
		currentData: null,
		pendingPromise: null,
		isPaginated: true,
		getURL: (payload) => `${BASE_URL}/entries?type=Bot&page=${payload.page || 0}`,
	},
	stickers: {
		validateData: (data) => data && Array.isArray(data),
		currentData: null,
		pendingPromise: null,
		dataPostProcess: null,
		isPaginated: true,
		getURL: (payload) => `${BASE_URL}/entries?type=Sticker&page=${payload.page || 0}`,
	},
	groups: {
		validateData: (data) => data && Array.isArray(data),
		currentData: null,
		pendingPromise: null,
		isPaginated: true,
		getURL: (payload) => `${BASE_URL}/entries?type=Group&page=${payload.page || 0}`,
	},
	random: {
		validateData: (data) => data && Array.isArray(data) && data.length >= 1,
		currentData: null,
		pendingPromise: null,
		isPaginated: false,
		ignoreCache: true,
		getURL: () => `${BASE_URL}/entries/random`,
	},
	search: {
		validateData: (data) => data && Array.isArray(data),
		currentData: null,
		pendingPromise: null,
		isPaginated: true,
		getURL: (payload) => `${BASE_URL}/entries?type=${payload.type}&search=${payload.search}&page=${payload.page || 0}`,
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

export function getModuleInfo(str) {
	const moduleInfo = API_MODULES[str.toLowerCase()];
	return moduleInfo;
}

/*
	getModuleData: Get data from cache (memory/storage) or server.
	Params:
		apiModule (string): String used to get an API_MODULES object matching by key (examples: 'home', 'stats')
		payload (object): Passed to the getURL method of apiModule object to build the URL query (examples: {page: 0, limit: 10})
		forceIgnoreCache (bool): To use or not the data saved in local storage/memory
	Return:
		Promise - resolve with a data object validated using the validateData method of the apiModule object
*/
export function getModuleData(apiModule, payload = {}, forceIgnoreCache = false) {
	console.log(apiModule);

	if (apiModule) {
		const moduleInfo = getModuleInfo(apiModule);

		if (moduleInfo) {
			if (moduleInfo.pendingPromise) return moduleInfo.pendingPromise; // Prevent concurrent promises/race condition for the same api module

			const paginatedIgnoreCache = moduleInfo.isPaginated && PAGINATED_IGNORE_CACHE;
			const shouldIgnoreCache = moduleInfo.ignoreCache || forceIgnoreCache || paginatedIgnoreCache;

			moduleInfo.pendingPromise = new Promise(function cb(resolve, reject) {
				console.log(`Running promise for ${apiModule.toLowerCase()}`);

				// Try to get data from local storage or memory
				const storageKey = STORAGE_KEY_PREFIX + apiModule.toLowerCase();
				let cacheParsed;
				if (!shouldIgnoreCache) {
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
				const validCache = !shouldIgnoreCache && cacheParsed && !cacheExpired && moduleInfo.validateData(cacheParsed.data);

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
								if (!shouldIgnoreCache) MMKV.set(storageKey, JSON.stringify(obj));
								// Save to memory to prevent unnecessary storage reads
								moduleInfo.current = obj;
								resolve(data);
							} else setTimeout(() => cb(resolve, reject), PROMISE_RETRY_TIMEOUT); // Retry promise if the server returned invalid data
						})
						.catch((error) => {
							// Retries done, server failed. Resolve with the data from cache if it's available.
							store.dispatch.apiErrorActive.setAPIErrorStatus(true); // Used to display a UI component to notify the user about the error
							console.log(`axios error : ${error}`);
							// Try to load the last data saved on error
							if (cacheParsed && cacheParsed.data) resolve(cacheParsed.data);
							// Retry promise if cache is invalid
							else if (!moduleInfo.ignoreCache && !forceIgnoreCache && !paginatedIgnoreCache) setTimeout(() => cb(resolve, reject), PROMISE_RETRY_TIMEOUT);
							// Reject if we don't have a valid cache and ignore cache is true
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
	}

	return undefined;
}

export function getEntryExtraData(id) {
	// Return: { description, comments } for id
}
