import express from "express";
import CommonRoutesConfig from "./common.routes.config";
import * as EntryModel from "../data/models/EntryModel";

export default class EntriesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "EntriesRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/entries`)
      .get(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          try {
            const queryLimit = Number(req.query.limit);
            const isQueryLimitValid =
              !Number.isNaN(queryLimit) &&
              queryLimit % 1 === 0 &&
              queryLimit <= 100 &&
              queryLimit >= 1;

            const queryPage = Number(req.query.page);
            const isQueryPageValid =
              !Number.isNaN(queryPage) && queryPage % 1 === 0;

            const limit = isQueryLimitValid ? queryLimit : 10;
            const page = isQueryPageValid ? queryPage : 0;

            EntryModel.ListEntries(limit, page)
              .then((result) => {
                // TODO: Remove description field to optimize
                /* resultEx = JSON.parse(JSON.stringify(result));
          
              resultEx.map((q) => {
                delete q.description;
                delete q.updated_date;
              }); */

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
