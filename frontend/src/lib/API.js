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
const CACHE_EXPIRATION_MINUTES = 1; // Minutes to consider the cache expired

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
	search: {
		validateData: (data) => data && Array.isArray(data),
		getURL: (payload) => `${BASE_URL}/entries?page=0&limit=10`,
	},
	top: {
		validateData: (data) => data && Array.isArray(data),
		getURL: (payload) => `${BASE_URL}/top?page=0`,
	},
	channels: {
		validateData: (data) => data && Array.isArray(data),
		getURL: (payload) => `${BASE_URL}/entries?type=channels&page=0`,
	},
	groups: {
		validateData: (data) => data && Array.isArray(data),
		getURL: (payload) => `${BASE_URL}/entries?type=groups&page=0`,
	},
	bots: {
		validateData: (data) => data && Array.isArray(data),
		getURL: (payload) => `${BASE_URL}/entries?type=bots&page=0`,
	},
	stickers: {
		validateData: (data) => data && Array.isArray(data),
		getURL: (payload) => `${BASE_URL}/entries?type=stickers&page=0`,
	},
};

// TODO: Save storage cache to memory instead of loading from storage everytime.
// TODO: Prevent race condition for each api module
/*
	getModuleData: Get data from cache.
	Params:
		apiModule (string): String used to get an API_MODULES object matching by this key (examples: 'home', 'stats')
		payload (object): Passed to the getURL method of apiModule object to build the URL query (examples: {page: 0, limit: 10})
		ignoreCache (bool): To use or not the data saved in local storage
	Return:
		Promise - Resolved with a data object if the server responds and the validateData method of the apiModule object returns true.
*/
export function getModuleData(apiModule = 'stats', payload = {}, ignoreCache = false) {
	const apiModuleStr = apiModule.toLowerCase();
	const moduleInfo = API_MODULES[apiModuleStr];

	console.log('---------');

	// Prevent concurrent calls for this api module
	if (moduleInfo.pendingPromise) {
		console.log(`Prevented concurrent promise for ${apiModuleStr}`);
		return moduleInfo.pendingPromise;
	}

	moduleInfo.pendingPromise = new Promise((resolve, reject) => {
		if (!apiModuleStr || !API_MODULES[apiModuleStr]) reject(new Error('Invalid api module'));

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
				// Get time from cache and calculate seconds remaining
				const cacheMoment = moment(cacheParsed.expirationTime);
				const secondsRemaining = cacheMoment ? cacheMoment.diff(moment(), 'seconds') : 0;
				console.log(`getModuleData ${apiModule}: cache seconds remaining ${secondsRemaining}`);

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
						moduleInfo.currentData = obj;
						resolve(resultData);
					} else reject(new Error('Data from server is not valid'));
				})
				.catch((error) => {
					// Retry done, server failed. Resolve with the data from cache if it's available.
					store.dispatch.apiErrorActive.setAPIErrorStatus(true); // Used to display a UI component to notify the user about the error
					console.log(`axios error : ${error}`);
					if (cacheParsed && cacheParsed.data) resolve(cacheParsed.data);
					else reject(new Error("Couldn't get data from server/local storage"));
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
