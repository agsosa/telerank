import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression";
import InitializeDatabase from "./src/data/Database";
import CommonRoutesConfig from "./src/routes/common.routes.config";
import EntriesRoutes from "./src/routes/entries.routes.config";
import StatsRoutes from "./src/routes/stats.routes.config";
import { PopulateDatabaseJob } from "./src/scrapers/ScraperJobs";
import { log } from "./src/lib/Helpers";

PopulateDatabaseJob();

const port = 4001;
const limiterOptions = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 150,
});
const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.enable('trust proxy'); // reverse proxy (heroku, nginx) https://expressjs.com/en/guide/behind-proxies.html
app.use(limiterOptions);

// Routes
const routes: CommonRoutesConfig[] = [];
routes.push(new EntriesRoutes(app));
routes.push(new StatsRoutes(app));

// Telerank
InitializeDatabase();
// scraper_jobs.initialize();

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(port, () => {
  log.info(`Server listening on port ${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    log.info(`Routes configured for ${route.getName()}`);
  });
});
