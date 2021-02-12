const express = require('express');
const scraper_jobs = require('./scraper_jobs');
require("./scraper");
const firebase = require('./firebase')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

firebase.initialize();
//scraper_jobs.initialize();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('OK');
});

app.get('/api/test', (req, res) => {
    res.send('OK');
    //res.json(data);
});

app.listen(port, () => console.log(`Backend listening on port ${port}`))
