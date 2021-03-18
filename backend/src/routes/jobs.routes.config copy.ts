import express from "express";
import CommonRoutesConfig from "./common.routes.config";
import { getCurrentFloodWait } from "../scrapers/telegram-proto/TelegramProto";
import { getRunningJobs } from "../scrapers/jobs/ScraperJobsManager";

// TODO: Add admin permission auth

export default class JobsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "JobsRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/jobs/flood-wait`)
      .get((req: express.Request, res: express.Response) => {
        getCurrentFloodWait().then((result: number) => {
          res.status(200).send({ FLOOD_WAIT: result });
        });
      });

    this.app
      .route(`/jobs/running`)
      .get((req: express.Request, res: express.Response) => {
        getCurrentFloodWait().then((result: number) => {
          res.status(200).send(getRunningJobs());
        });
      });
    return this.app;
  }
}
