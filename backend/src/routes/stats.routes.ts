import express from "express";
import { GetStats } from "data/models/StatsModel";

export function initialize(app: express.Application): void {
  // Parameters: none
  // Return: IStats object
  app
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
