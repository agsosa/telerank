import "module-alias/register";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression";

import InitializeDatabase from "data/Database";
import CommonRoutesConfig from "routes/common.routes.config";
import EntriesRoutes from "routes/entries.routes.config";
import StatsRoutes from "routes/stats.routes.config";
import { InitializeJobs } from "scrapers/jobs/ScraperJobsManager";
import { InitializeTelegramProto } from "scrapers/telegram-proto/TelegramProto";
import JobsRoutes from "routes/jobs.routes.config";
import { log } from "lib/Helpers";

// Configure app
const port = 4001;
const limiterOptions = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 150,
});
const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.enable('trust proxy'); // reverse proxy (heroku, nginx) https://expressjs.com/en/guide/behind-proxies.html
app.use(limiterOptions);

// Routes
const routes: CommonRoutesConfig[] = [];
routes.push(new EntriesRoutes(app));
routes.push(new StatsRoutes(app));
routes.push(new JobsRoutes(app));

// Modules
InitializeDatabase().then(() => {
  InitializeTelegramProto();
  InitializeJobs();
});

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(port, () => {
  log.info(`Server listening on port ${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    log.info(`Routes configured for ${route.getName()}`);
  });
});
