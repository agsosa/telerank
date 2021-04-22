import express from "express";
import * as controller from "controllers/StatsController";

export function initialize(router: express.Router): void {
  // Parameters: none
  // Return: IStats object
  router.get(`/stats`, controller.getStats);
}
