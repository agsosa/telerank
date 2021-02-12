const express = require('express');
const scraper_jobs = require('./scraper_jobs');
require("./scraper");
const firebase = require('./firebase')
const database = require('./database');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

firebase.initialize();
//scraper_jobs.initialize();
//database.AddEntry({username: "usuarioxd", type: "channel", language: "es", category: "cryptocurrencies", title: "loleta", description:"esta es una descripcion", members:50, image:"404.jpg", created_date: Date.now(), updated_date: Date.now(), likes: 50, dislikes: 150, featured: false})
//database.GetAllEntries(null);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('OK');
});

app.get('/api/entries/', (req, res) => { // List entries pagination supported
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    
    database.ListEntries(limit, page).then((result) => {
        res.status(200).send(result);
    })
});

app.listen(port, () => console.log(`Backend listening on port ${port}`))
