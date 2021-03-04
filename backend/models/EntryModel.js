const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EntryModelSchema = new Schema({
	username: String,
	type: String,
	language: String,
	category: String,
	title: String,
	description: String,
	members: Number,
	image: String,
	created_date: Date,
	updated_date: Date,
	likes: Number,
	dislikes: Number,
	featured: Boolean,
	reports: Number,
	pending: Boolean,
	removed: Boolean,
	views: Boolean,
});

module.exports = mongoose.model('EntryModel', EntryModelSchema);
