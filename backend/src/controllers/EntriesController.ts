import express from "express";
import * as EntryModel from "models/EntryModel";
import { parseEntryType } from "telerank-shared/lib";

const LIMIT_PER_PAGE = 20; // Limit of objects returned per page
const LIMIT_RECENT = 5; // Max entries returned by /entries/recent
const LIMIT_POPULAR = 50; // Max entries returned by /entries/popular
const LIMIT_BIGGEST = 50; // Max entries returned by /entries/biggest
const LIMIT_TOP = 50; // Max entries returned by /entries/top

export function getList(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // Query param: page
  const queryPage = Number(req.query.page);
  const isQueryPageValid = !Number.isNaN(queryPage) && queryPage % 1 === 0;

  // Query param: type
  const queryType = req.query.type?.toString();
  const parsedQueryType = queryType ? parseEntryType(queryType) : undefined;

  // Query param: search
  const querySearch = req.query.search?.toString();

  // Final params
  const search = querySearch || "";
  const type = parsedQueryType ? { type: parsedQueryType } : {};
  const page = isQueryPageValid ? queryPage : 0;

  EntryModel.GetPaginatedList(LIMIT_PER_PAGE, page, true, type, {}, search) // TODO: Check EntryModel.GetList parameter includeDescription
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      const error = new Error(e.codeName);
      res.status(400);
      next(error);
    });
}

export function getFeaturedList(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  EntryModel.GetList({ featured: true }, {}, true)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      const error = new Error(e.codeName);
      res.status(400);
      next(error);
    });
}

export function getBiggestList(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  EntryModel.GetList({}, { members: "desc" }, true, LIMIT_BIGGEST)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      const error = new Error(e.codeName);
      res.status(400);
      next(error);
    });
}

export function getPopularList(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  EntryModel.GetList({}, { views: "desc" }, true, LIMIT_POPULAR)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      const error = new Error(e.codeName);
      res.status(400);
      next(error);
    });
}

export function getTopList(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  EntryModel.GetList({}, { likes: "desc", dislikes: "asc" }, true, LIMIT_TOP)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      const error = new Error(e.codeName);
      res.status(400);
      next(error);
    });
}

export function getRecentList(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  EntryModel.GetList({}, { addedDate: "desc" }, true, LIMIT_RECENT)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      const error = new Error(e.codeName);
      res.status(400);
      next(error);
    });
}

export function getRandom(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  EntryModel.getRandomEntry()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      const error = new Error(e.codeName);
      res.status(400);
      next(error);
    });
}
