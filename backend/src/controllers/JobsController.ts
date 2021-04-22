import express from "express";
import { getCurrentFloodWait } from "scrapers/telegram-scrapers/TelegramProtoManager";
import { getRunningJobs } from "jobs/JobsManager";

export function getStatus(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  getCurrentFloodWait().then((result: number) => {
    res.status(200).send({ FLOOD_WAIT: result, runningJobs: getRunningJobs() });
  });
}
