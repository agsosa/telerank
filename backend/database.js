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
		Channels: { $arrayElemAt: ['$Channels.Channels', 0] },
		Groups: { $arrayElemAt: ['$Groups.Groups', 0] },
		Bots: { $arrayElemAt: ['$Bots.Bots', 0] },
		Stickers: { $arrayElemAt: ['$Stickers.Stickers', 0] },
		Spanish: { $arrayElemAt: ['$Spanish.Spanish', 0] },
		English: { $arrayElemAt: ['$English.English', 0] },
		Members: { $arrayElemAt: ['$Members.Members', 0] },
		Ratings: { $arrayElemAt: ['$Ratings.Ratings', 0] },
		Featured: { $arrayElemAt: ['$Featured.Featured', 0] },
		Removed: { $arrayElemAt: ['$Featured.Removed', 0] },
		Pending: { $arrayElemAt: ['$Featured.Pending', 0] },
	};

	const result = await EntryModel.aggregate([
		{
			$facet: {
				Channels: [{ $match: { type: 'Channels' } }, { $count: 'Channels' }],
				Groups: [{ $match: { type: 'Groups' } }, { $count: 'Groups' }],
				Bots: [{ $match: { type: 'Bots' } }, { $count: 'Bots' }],
				Stickers: [{ $match: { type: 'Stickers' } }, { $count: 'Stickers' }],
				Spanish: [{ $match: { language: 'es' } }, { $count: 'Spanish' }],
				English: [{ $match: { language: 'en' } }, { $count: 'English' }],
				Members: [{ $group: { _id: null, Members: { $sum: '$members' } } }],
				Ratings: [{ $group: { _id: null, Ratings: { $sum: { $add: ['$likes', '$dislikes'] } } } }],
				Featured: [{ $match: { featured: true } }, { $count: 'Featured' }],
				Pending: [{ $match: { pending: true } }, { $count: 'Pending' }],
				Removed: [{ $match: { removed: true } }, { $count: 'Removed' }],
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
