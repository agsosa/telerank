import express from "express";
import * as JobsRoutes from "routes/JobsRoutes";
import * as StatsRoutes from "routes/StatsRoutes";
import * as EntriesRoutes from "routes/EntriesRoutes";

const router = express.Router();

export function initializeRoutes(app: express.Application): void {
  JobsRoutes.initialize(router);
  StatsRoutes.initialize(router);
  EntriesRoutes.initialize(router);

  app.use("/api", router);
}
