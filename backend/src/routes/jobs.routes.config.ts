import express from "express";
import CommonRoutesConfig from "routes/common.routes.config";
import { getCurrentFloodWait } from "scrapers/telegram-proto/TelegramProto";
import { getRunningJobs } from "scrapers/jobs/ScraperJobsManager";

// TODO: Add admin permission auth

export default class JobsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "JobsRoutes");
  }

  // Parameters: none
  // Return: Information related to the jobs module
  configureRoutes(): express.Application {
    this.app
      .route(`/jobs`)
      .get((req: express.Request, res: express.Response) => {
        getCurrentFloodWait().then((result: number) => {
          res
            .status(200)
            .send({ FLOOD_WAIT: result, runningJobs: getRunningJobs() });
        });
      });
    return this.app;
  }
}
