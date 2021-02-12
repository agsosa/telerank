var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EntryModelSchema = new Schema({
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
});

module.exports = mongoose.model('EntryModel', EntryModelSchema );