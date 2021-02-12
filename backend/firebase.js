let admin = require('firebase-admin');
let serviceAccount = require("./serviceAccountKey.json");

let db;

const initialize = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  db = admin.firestore();
}

const addEntry = async (data) => {
  return db.collection('entries').add(data);
}

const getAllEntries = (callback) => {
  var ref = db.collection('entries');
  ref.get()
    .then(snapshot => {
        let results = [];
        snapshot.forEach(doc => {
            results.push(doc.data());
        });
        callback(results);
    })
    .catch(err => {
        console.log('Error getting documents', err); // TODO: HANDLE ERROR
    });
}

exports.getAllEntries = getAllEntries;
exports.initialize = initialize;
exports.addEntry = addEntry;