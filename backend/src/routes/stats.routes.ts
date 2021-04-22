import express from "express";
import { GetStats } from "models/StatsModel";

export function initialize(router: express.Router): void {
  // Parameters: none
  // Return: IStats object
  router
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
}
