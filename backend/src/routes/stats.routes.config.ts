import express from "express";
import CommonRoutesConfig from "./common.routes.config";
import { GetStats } from "../data/models/StatsModel";
import { log } from "../lib/Helpers";

export default class StatsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "StatsRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/stats`)
      .get(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          try {
            GetStats()
              .then((result) => {
                res.status(200).send(result);
              })
              .catch((e) => {
                const error = new Error(e.codeName);
                res.status(400);
                next(error);
              });
          } catch (e) {
            const error = new Error(e.toString());
            res.status(400);
            next(error);
          }
        }
      );

    return this.app;
  }
}
