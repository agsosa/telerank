var Ddos = require('ddos'); // TODO: Test this library https://github.com/animir/node-rate-limiter-flexible
const express = require('express');
var compression = require('compression');
const scraper_jobs = require('./scraper_jobs');
const firebase = require('./firebase');
const database = require('./database');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./scraper');

// TODO: Para cada media scrapeado subir la imagen a bucket de google storage ya que los archivos de imagen de telegram expiran

function byteLength(str) {
	// TODO: Remove or move to utils
	// returns the byte length of an utf8 string
	var s = str.length;
	for (var i = str.length - 1; i >= 0; i--) {
		var code = str.charCodeAt(i);
		if (code > 0x7f && code <= 0x7ff) s++;
		else if (code > 0x7ff && code <= 0xffff) s += 2;
		if (code >= 0xdc00 && code <= 0xdfff) i--; //trail surrogate
	}
	return s;
}

var ddos = new Ddos({ burst: 10, limit: 15 });
const app = express();
const port = 4001;

firebase.initialize();
//scraper_jobs.initialize();
//database.AddEntry({username: "usuarioxd", type: "channel", language: "es", category: "cryptocurrencies", title: "loleta", description:"esta es una descripcion", members:50, image:"404.jpg", created_date: Date.now(), updated_date: Date.now(), likes: 50, dislikes: 150, featured: false})
//database.GetAllEntries(null);

app.use(compression());
app.use(ddos.express);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('OK');
});

app.get('/api/entries/', (req, res) => {
	// Query parameters: limit (number), page (number)
	// Returns array of EntryModel
	let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
	let page = 0;
	if (req.query) {
		if (req.query.page) {
			req.query.page = parseInt(req.query.page);
			page = Number.isInteger(req.query.page) ? req.query.page : 0;
		}
	}

	database.ListEntries(limit, page).then((result) => {
		resultEx = JSON.parse(JSON.stringify(result));

		resultEx.map((q) => {
			delete q.description;
			delete q.updated_date;
		});

		res.status(200).send(resultEx);
	});
});

app.get('/api/stats/', (req, res) => {
	// Query parameters: none
	// Returns object stats
	database.GetStats().then((result) => {
		console.log('GetStats returning ' + result);
		res.status(200).send(result);
	});
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
