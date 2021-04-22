import express from "express";
import * as JobsRoutes from "routes/jobs.routes";
import * as StatsRoutes from "routes/stats.routes";
import * as EntriesRoutes from "routes/entries.routes";

export function initializeRoutes(app: express.Application): void {
  JobsRoutes.initialize(app);
  StatsRoutes.initialize(app);
  EntriesRoutes.initialize(app);
}
