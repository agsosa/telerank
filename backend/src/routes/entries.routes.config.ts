import express from "express";
import CommonRoutesConfig from "./common.routes.config";
import * as EntryModel from "../data/models/entry-model/EntryModel";
import { capitalizeStr, log } from "../lib/Helpers";
import EnumEntryType, {
  parseEntryType,
} from "../data/models/entry-model/EnumEntryType";
import EnumLanguage from "../data/models/entry-model/EnumLanguage";

// TODO: Implementar LIMIT_PER_PAGE para biggest, recent, popular, top

const LIMIT_PER_PAGE = 10; // Limit of objects returned per page
const LIMIT_RECENT = 10; // Max entries returned by /entries/recent
const LIMIT_POPULAR = 10; // Max entries returned by /entries/popular
const LIMIT_BIGGEST = 10; // Max entries returned by /entries/biggest
const LIMIT_TOP = 10; // Max entries returned by /entries/top

export default class EntriesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "EntriesRoutes");
  }

  configureRoutes(): express.Application {
    /*
      API Endpoint: /entries
      Paginated: yes
      Description: Get a list of entries by type and page.
      Query Parameters:
        - (optional) page: number. Default: 0
        - (optional) type: string matching a EnumEntryType. Default: any
      Return JSON:
        Array of max. LimitPerPage IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Not sorted.
    */
    this.app
      .route(`/entries`)
      .get(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          try {
            // Query param: page
            const queryPage = Number(req.query.page);
            const isQueryPageValid =
              !Number.isNaN(queryPage) && queryPage % 1 === 0;

            // Query param: type
            const queryType = req.query.type?.toString();
            const parsedQueryType = queryType
              ? parseEntryType(queryType)
              : undefined;

            // Final params
            const type = parsedQueryType ? { type: parsedQueryType } : {};
            const page = isQueryPageValid ? queryPage : 0;

            EntryModel.GetPaginatedList(LIMIT_PER_PAGE, page, true, type) // TODO: Check EntryModel.GetList parameter includeDescription
              .then((result) => {
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

    /*
      API Endpoint: /entries/featured
      Paginated: no
      Description: Get a list of all the featured entries
      Query Parameters: none
      Return JSON:
        Array of IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Not sorted
    */
    this.app
      .route(`/entries/featured`)
      .get(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          try {
            EntryModel.GetList({ featured: true })
              .then((result) => {
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

    /*
      API Endpoint: /entries/biggest
      Paginated: no
      Description: Get a list of the top 100 entries by member count
      Query Parameters: none
      Return JSON:
        Array of max 100 IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Sorted by members count (descending)
    */
    this.app
      .route(`/entries/biggest`)
      .get(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          try {
            EntryModel.GetList({}, { members: "desc" }, false, LIMIT_BIGGEST)
              .then((result) => {
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

    /*
      API Endpoint: /entries/popular
      Paginated: no
      Description: Get a list of the top 100 entries by views count
      Query Parameters: none
      Return JSON:
        Array of max 100 IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Sorted by views count (descending)
    */
    this.app
      .route(`/entries/popular`)
      .get(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          try {
            EntryModel.GetList({}, { views: "desc" }, false, LIMIT_POPULAR)
              .then((result) => {
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

    /*
      API Endpoint: /entries/top
      Paginated: no
      Description: Get a list of the top 100 entries by likes/dislikes
      Query Parameters: none
      Return JSON:
        Array of max 100 IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Sorted by likes (descending) and dislikes(ascending)
    */
    this.app
      .route(`/entries/top`)
      .get(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          try {
            EntryModel.GetList(
              {},
              { likes: "desc", dislikes: "asc" },
              false,
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
          } catch (e) {
            const error = new Error(e.toString());
            res.status(400);
            next(error);
          }
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
    this.app
      .route(`/entries/recent`)
      .get(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          try {
            EntryModel.GetList({}, { dateAdded: "desc" }, false, LIMIT_RECENT)
              .then((result) => {
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

/*            // Query param: rankings
            const queryRankings:
              | string
              | undefined = req.query.special?.toString();
            const isQueryRankingsValid =
              queryRankings &&
              (Object.values(EnumRankings) as string[]).includes(queryRankings);
              const rankings = isQueryRankingsValid ? */
