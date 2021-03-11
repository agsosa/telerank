import mongoose, { Schema } from 'mongoose';

// TODO: EnumCategory, EnumType, EnumLanguage, etc

const EntryModelSchema = new Schema({
	username: { type: String, required: true, unique: true },
	type: { type: String, required: true },
	language: { type: String, required: true, default: 'English' },
	category: { type: String, required: true, default: 'Other' },
	title: { type: String, required: false },
	description: { type: String, required: false },
	members: { type: Number, required: false, default: 0 },
	image: { type: String, required: false },
	created_date: { type: Date, required: false, default: Date.now },
	updated_date: { type: Date, required: false, default: Date.now },
	likes: { type: Number, required: false, default: 0 },
	dislikes: { type: Number, required: false, default: 0 },
	featured: { type: Boolean, required: false, default: false },
	reports: { type: Number, required: false, default: 0 },
	pending: { type: Boolean, required: true, default: true },
	removed: { type: Boolean, required: true, default: true },
	views: { type: Number, required: false, default: 0 },
});

export default mongoose.model('EntryModel', EntryModelSchema);
