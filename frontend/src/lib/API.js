import axios from 'axios';
// import axios-retry from 'axios-retry'; // TODO: Implementar axios-retry
import moment from 'moment';
import { MMKV } from 'react-native-mmkv';

const BASE_URL = 'http://8161bfba0a50.ngrok.io/api';
const STORAGE_KEY_PREFIX = 'tr_';
const CACHE_EXPIRATION_MINUTES = 5;

const API_MODULES = {
	home: {
		getURL: (payload) => `${BASE_URL}/entries?page=0&limit=10`,
	},
};

// getModuleData: Get data from cache or server. Will resolve only with a valid ARRAY.
export function getModuleData(apiModule, payload) {
	// TODO: Remove async from promise and axios.get
	// MMKV.setString('home', 'test');
	// MMKV.delete('tr_home');
	// console.log('tr_home');
	return new Promise((resolve, reject) => {
		const apiModuleStr = apiModule.toLowerCase();
		console.log(`1 ${apiModuleStr}`);
		if (apiModuleStr && API_MODULES[apiModuleStr]) {
			const moduleInfo = API_MODULES[apiModuleStr];
			const CACHE_STORAGE_KEY = STORAGE_KEY_PREFIX + apiModuleStr;
			const now = moment(new Date());
			console.log('2');
			// Try to get cache from local storage
			const cache = MMKV.getString(CACHE_STORAGE_KEY); // { data: [], expirationTime: date time }
			const cacheParsed = cache ? JSON.parse(cache) : null;
			console.log('3');
			// Check cache expiration time
			let cacheExpired = false;
			if (cacheParsed && cacheParsed.expirationTime) {
				// console.log(cacheParsed);
				const cacheMoment = moment(cacheParsed.expirationTime);
				const minutesRemaining = cacheMoment && cacheMoment.isValid() ? Math.abs(moment.duration(now.diff(cacheMoment)).asMinutes()) : 0;
				console.log(`found cache, expiration in ${minutesRemaining}`);
				if (minutesRemaining <= 0) cacheExpired = true;
			}

			console.log('4');
			// Check cache validity and fetch from server if it's not valid
			const validCache = cacheParsed && !cacheExpired && cacheParsed.data && Array.isArray(cacheParsed.data) && cacheParsed.data.length > 0;
			if (!validCache) {
				// console.log(`validCache is false. Conditions: ${cacheParsed} ${cacheExpired} ${cacheParsed.data} ${Array.isArray(cacheParsed.data)} ${cacheParsed.data.length}`);
				console.log('5');
				axios.get(moduleInfo.getURL(payload)).then((result) => {
					const resultData = result.data;
					if (resultData && Array.isArray(resultData)) {
						// TODO: Revisar que el backend siempre devuelva un array
						console.log('6');
						console.log(`Got data from backend with length ${resultData.length}`);
						MMKV.set(CACHE_STORAGE_KEY, JSON.stringify({ data: resultData, expirationTime: moment().add(CACHE_EXPIRATION_MINUTES, 'minutes') }));
						console.log('7');
						console.log(`Next expiration time for cache data is ${moment().add(CACHE_EXPIRATION_MINUTES, 'minutes').toString()}`);
						resolve(resultData);
					}
				});
				// TODO: Add reject
			} else resolve(cacheParsed.data);
		}
	});
}

export function getSingleData(username) {}
