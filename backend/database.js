// TODO: Error handling, connection check

var mongoose = require('mongoose');
var EntryModel = require('./models/EntryModel')

var mongoDB = 'mongodb://localhost/telerank';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function AddEntry(obj, onResult) {
  EntryModel.create(obj, function (err, instance) {
    if (err) return console.log(err);
    if (onResult) onResult(err);
  });
}

function GetAllEntries(onResult) {
  // TODO: Implement with cursor
  /*let res = await EntryModel.find();
  if (onResult) onResult(res);*/

  EntryModel.find({}, function(err, res) {
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
    })
  });
}

exports.AddEntry = AddEntry;
exports.GetAllEntries = GetAllEntries;
exports.ListEntries = ListEntries;