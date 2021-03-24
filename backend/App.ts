import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression";
import InitializeDatabase from "./src/data/Database";
import CommonRoutesConfig from "./src/routes/common.routes.config";
import EntriesRoutes from "./src/routes/entries.routes.config";
import StatsRoutes from "./src/routes/stats.routes.config";
import { InitializeJobs } from "./src/scrapers/jobs/ScraperJobsManager";
import { log } from "./src/lib/Helpers";
import { InitializeTelegramProto } from "./src/scrapers/telegram-proto/TelegramProto";
import JobsRoutes from "./src/routes/jobs.routes.config copy";

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
app.use(express.urlencoded());
app.use(express.json());
// app.enable('trust proxy'); // reverse proxy (heroku, nginx) https://expressjs.com/en/guide/behind-proxies.html
app.use(limiterOptions);

// Routes
const routes: CommonRoutesConfig[] = [];
routes.push(new EntriesRoutes(app));
routes.push(new StatsRoutes(app));
routes.push(new JobsRoutes(app));

// Telerank modules
InitializeTelegramProto();
InitializeDatabase();
InitializeJobs();

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(port, () => {
  log.info(`Server listening on port ${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    log.info(`Routes configured for ${route.getName()}`);
  });
});
