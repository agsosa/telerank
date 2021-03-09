const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');
//const morgan = require('morgan');
const cors = require('cors');

const scraper_jobs = require('./scraper_jobs');
const firebase = require('./firebase');
const database = require('./database');
const scraper = require('./scraper');

// TODO: Para cada media scrapeado subir la imagen a bucket de google storage ya que los archivos de imagen de telegram expiran

const app = express();
const port = 4001;

app.use(helmet());
//app.use(morgan('combined'));
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

firebase.initialize();
//scraper_jobs.initialize();
//database.AddEntry({username: "usuarioxd", type: "channel", language: "es", category: "cryptocurrencies", title: "loleta", description:"esta es una descripcion", members:50, image:"404.jpg", created_date: Date.now(), updated_date: Date.now(), likes: 50, dislikes: 150, featured: false})
//database.GetAllEntries(null);

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
		/*resultEx = JSON.parse(JSON.stringify(result));

		resultEx.map((q) => {
			delete q.description;
			delete q.updated_date;
		});*/

		res.status(200).send(result);
	});
});

app.get('/api/stats/', (req, res) => {
	// Query parameters: none
	// Returns object stats
	database.GetStats((result) => {
		console.log('GetStats returning ' + result);
		res.status(200).send(result);
	});
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
