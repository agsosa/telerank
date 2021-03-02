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

export const count = {
	name: 'count',
	state: 0, // initial state
	reducers: {
		// handle state changes with pure functions
		increment(state, payload) {
			return state + payload;
		},
	},
	effects: (dispatch) => ({
		// handle state changes with impure functions.
		// use async/await for async actions
		async incrementAsync(payload, rootState) {},
	}),
};
