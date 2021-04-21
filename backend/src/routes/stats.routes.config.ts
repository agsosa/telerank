import express from "express";
import CommonRoutesConfig from "routes/common.routes.config";
import { GetStats } from "data/models/StatsModel";

export default class StatsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "StatsRoutes");
  }

  configureRoutes(): express.Application {
    // Parameters: none
    // Return: IStats object
    this.app
      .route(`/stats`)
      .get(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          GetStats()
            .then((result) => {
              res.status(200).send(result);
            })
            .catch((e) => {
              const error = new Error(e.codeName);
              res.status(400);
              next(error);
            });
        }
      );

    return this.app;
  }
}
