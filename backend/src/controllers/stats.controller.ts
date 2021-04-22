import express from "express";
import * as StatsModel from "models/StatsModel";

export function getStats(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  StatsModel.getStats()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      const error = new Error(e.codeName);
      res.status(400);
      next(error);
    });
}
