let admin = require('firebase-admin');
let serviceAccount = require("./serviceAccountKey.json");

let db;

const initialize = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  db = admin.firestore();
}

testDB = async () => {
  const data = {
    username: "test",
    type: 'Channel',
    language: 'es'
  };

  const res = await db.collection('entries').add(data);
}

exports.initialize = initialize;
//exports.addEntry = addEntry;