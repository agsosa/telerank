import express from "express";
import * as JobsRoutes from "routes/jobs.routes";
import * as StatsRoutes from "routes/stats.routes";
import * as EntriesRoutes from "routes/entries.routes";

const router = express.Router();

export function initializeRoutes(app: express.Application): void {
  JobsRoutes.initialize(router);
  StatsRoutes.initialize(router);
  EntriesRoutes.initialize(router);

  app.use("/api", router);
}
