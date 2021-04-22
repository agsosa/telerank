import express from "express";
import * as controller from "controllers/jobs.controller";

export function initialize(router: express.Router): void {
  router.get(`/jobs`, controller.getStatus);
}
