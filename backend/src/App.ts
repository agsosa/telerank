import "module-alias/register";
require("dotenv").config();
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression";

import initializeDatabase from "lib/Database";
import { initializeRoutes } from "routes";
import { initializeJobs } from "scrapers/jobs/ScraperJobsManager";
import { initializeTelegramProto } from "scrapers/telegram-proto/TelegramProto";
import { log } from "lib/Helpers";

// Configure app
const port = process.env.PORT || 4001;

const limiterOptions = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 150,
});

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
// app.enable('trust proxy'); // reverse proxy (heroku, nginx) https://expressjs.com/en/guide/behind-proxies.html
app.use(limiterOptions);

// Modules
initializeDatabase().then(() => {
  initializeTelegramProto();
  initializeJobs();
});

// Routes
app.get("/", (req, res) => {
  res.send("OK");
});

initializeRoutes(app);

app.listen(port, () => {
  log.info(`Server listening on port ${port}`);
});
