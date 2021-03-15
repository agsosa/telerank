import express from "express";
import CommonRoutesConfig from "./common.routes.config";
import * as EntryModel from "../data/models/entry-model/EntryModel";
import { capitalizeStr, log } from "../lib/Helpers";
import EnumEntryType, {
  parseEntryType,
} from "../data/models/entry-model/EnumEntryType";
import EnumLanguage from "../data/models/entry-model/EnumLanguage";

const LIMIT_PER_PAGE = 10; // Limit of objects returned per page

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
            const queryType: string | undefined = req.query.type?.toString();
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
