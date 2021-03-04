// TODO: Error handling, connection check

const mongoose = require('mongoose');
const EntryModel = require('./models/EntryModel');
const moment = require('moment');

/* MongoDB connection */
const mongoDB = 'mongodb://localhost/telerank';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Entries */
function AddEntry(obj, onResult) {
	EntryModel.create(obj, function (err, instance) {
		if (err) return console.log(err);
		if (onResult) onResult(err);
	});
}

function GetAllEntries(onResult) {
	EntryModel.find({}, function (err, res) {
		if (err) return console.log(err);
		if (onResult) onResult(res);
	});
}

function ListEntries(perPage, page) {
	return new Promise((resolve, reject) => {
		EntryModel.find()
			.limit(perPage)
			.skip(perPage * page)
			.exec(function (err, entries) {
				if (err) {
					reject(err);
				} else {
					resolve(entries);
				}
			});
	});
}

/* Stats */
const STATS_CACHE_EXPIRATION_SECONDS = 60;

const stats = {
	expirationTime: null,
	data: null,
};

function GetStats(onResult) {
	const cacheSecondsRemaining = stats.expirationTime ? stats.expirationTime.diff(moment(), 'seconds') : 0;

	if (!stats.data || cacheSecondsRemaining <= 0) {
		// Get from database if cache is not valid
		console.log('GetStats cache data expired, fetching from database');
		GetStatsFromDatabase((data) => {
			stats.data = data;
			stats.expirationTime = moment().add(STATS_CACHE_EXPIRATION_SECONDS, 'seconds');

			if (onResult) onResult(data);
		});
	} else {
		// Cache is still valid, return cache
		console.log('GetStats cache is valid, returning cache');
		if (onResult) onResult(stats.data);
	}
}

async function GetStatsFromDatabase(onResult) {
	const _project = {
		channels: { $arrayElemAt: ['$channels.channels', 0] },
		groups: { $arrayElemAt: ['$groups.groups', 0] },
		bots: { $arrayElemAt: ['$bots.bots', 0] },
		stickers: { $arrayElemAt: ['$stickers.stickers', 0] },
		spanish: { $arrayElemAt: ['$spanish.spanish', 0] },
		english: { $arrayElemAt: ['$english.english', 0] },
		members: { $arrayElemAt: ['$members.members', 0] },
		ratings: { $arrayElemAt: ['$ratings.ratings', 0] },
		featured: { $arrayElemAt: ['$featured.featured', 0] },
		removed: { $arrayElemAt: ['$removed.removed', 0] },
		pending: { $arrayElemAt: ['$pending.pending', 0] },
		views: { $arrayElemAt: ['$views.views', 0] },
	};

	const result = await EntryModel.aggregate([
		{
			$facet: {
				channels: [{ $match: { type: 'Channels' } }, { $count: 'channels' }],
				groups: [{ $match: { type: 'Groups' } }, { $count: 'groups' }],
				bots: [{ $match: { type: 'Bots' } }, { $count: 'bots' }],
				stickers: [{ $match: { type: 'Stickers' } }, { $count: 'stickers' }],
				spanish: [{ $match: { language: 'es' } }, { $count: 'spanish' }],
				english: [{ $match: { language: 'en' } }, { $count: 'english' }],
				members: [{ $group: { _id: null, members: { $sum: '$members' } } }],
				ratings: [{ $group: { _id: null, ratings: { $sum: { $add: ['$likes', '$dislikes'] } } } }],
				featured: [{ $match: { featured: true } }, { $count: 'featured' }],
				pending: [{ $match: { pending: true } }, { $count: 'pending' }],
				removed: [{ $match: { removed: true } }, { $count: 'removed' }],
				views: [{ $group: { _id: null, views: { $sum: '$views' } } }],
			},
		},
		{
			$project: _project,
		},
	]).then((result) => result[0]);

	Object.keys(_project).forEach((k) => {
		if (!result[k]) result[k] = 0;
	});

	console.log(result);

	if (onResult) onResult(result);
}

GetStats();

exports.AddEntry = AddEntry;
exports.GetAllEntries = GetAllEntries;
exports.ListEntries = ListEntries;
exports.GetStats = GetStats;
