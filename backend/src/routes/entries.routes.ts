import express from "express";
import * as EntryModel from "data/models/EntryModel";
import { parseEntryType } from "telerank-shared/lib";

const LIMIT_PER_PAGE = 20; // Limit of objects returned per page
const LIMIT_RECENT = 5; // Max entries returned by /entries/recent
const LIMIT_POPULAR = 50; // Max entries returned by /entries/popular
const LIMIT_BIGGEST = 50; // Max entries returned by /entries/biggest
const LIMIT_TOP = 50; // Max entries returned by /entries/top

export function initialize(app: express.Application) {
  /*
      API Endpoint: /entries
      Paginated: yes
      Description: Get a list of entries by type and page.
      Query Parameters:
        - (optional) page: number. Default: 0
        - (optional) type: string matching a EnumEntryType. Default: any
        - (optional) search: string to search on title, description and username. Default: undefined
      Return JSON:
        Array of max. LimitPerPage IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Not sorted.
    */
  app
    .route(`/entries`)
    .get(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        // Query param: page
        const queryPage = Number(req.query.page);
        const isQueryPageValid =
          !Number.isNaN(queryPage) && queryPage % 1 === 0;

        // Query param: type
        const queryType = req.query.type?.toString();
        const parsedQueryType = queryType
          ? parseEntryType(queryType)
          : undefined;

        // Query param: search
        const querySearch = req.query.search?.toString();

        // Final params
        const search = querySearch || "";
        const type = parsedQueryType ? { type: parsedQueryType } : {};
        const page = isQueryPageValid ? queryPage : 0;

        EntryModel.GetPaginatedList(
          LIMIT_PER_PAGE,
          page,
          true,
          type,
          {},
          search
        ) // TODO: Check EntryModel.GetList parameter includeDescription
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

  /*
      API Endpoint: /entries/featured
      Paginated: no
      Description: Get a list of all the featured entries
      Query Parameters: none
      Return JSON:
        Array of IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Not sorted
    */
  app
    .route(`/entries/featured`)
    .get(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
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
    );

  /*
      API Endpoint: /entries/biggest
      Paginated: no
      Description: Get a list of the top 50 entries by member count
      Query Parameters: none
      Return JSON:
        Array of max 50 IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Sorted by members count (descending)
    */
  app
    .route(`/entries/biggest`)
    .get(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
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
    );

  /*
      API Endpoint: /entries/popular
      Paginated: no
      Description: Get a list of the top 50 entries by views count
      Query Parameters: none
      Return JSON:
        Array of max 50 IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Sorted by views count (descending)
    */
  app
    .route(`/entries/popular`)
    .get(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
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
    );

  /*
      API Endpoint: /entries/top
      Paginated: no
      Description: Get a list of the top 50 entries by likes/dislikes
      Query Parameters: none
      Return JSON:
        Array of max 50 IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Sorted by likes (descending) and dislikes(ascending)
    */
  app
    .route(`/entries/top`)
    .get(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        EntryModel.GetList(
          {},
          { likes: "desc", dislikes: "asc" },
          true,
          LIMIT_TOP
        )
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

  /*
      API Endpoint: /entries/recent
      Paginated: no
      Description: Get a list of the 10 latest entries added to the directory
      Query Parameters: none
      Return JSON:
        Array of max 10 IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Sorted by added date
    */
  app
    .route(`/entries/recent`)
    .get(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
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
    );

  /*
      API Endpoint: /entries/random
      Paginated: no
      Description: Get a random IEntry
      Query Parameters: none
      Return JSON:
        A random IEntry
    */
  app
    .route(`/entries/random`)
    .get(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
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
    );
}
