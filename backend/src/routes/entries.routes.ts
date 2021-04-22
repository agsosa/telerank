import express from "express";
import * as controller from "controllers/entries.controller";

export function initialize(router: express.Router) {
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
  router.route(`/entries`).get(controller.getList);

  /*
      API Endpoint: /entries/featured
      Paginated: no
      Description: Get a list of all the featured entries
      Query Parameters: none
      Return JSON:
        Array of IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Not sorted
    */
  router.route(`/entries/featured`).get(controller.getFeaturedList);

  /*
      API Endpoint: /entries/biggest
      Paginated: no
      Description: Get a list of the top 50 entries by member count
      Query Parameters: none
      Return JSON:
        Array of max 50 IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Sorted by members count (descending)
    */
  router.route(`/entries/biggest`).get(controller.getBiggestList);

  /*
      API Endpoint: /entries/popular
      Paginated: no
      Description: Get a list of the top 50 entries by views count
      Query Parameters: none
      Return JSON:
        Array of max 50 IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Sorted by views count (descending)
    */
  router.route(`/entries/popular`).get(controller.getPopularList);

  /*
      API Endpoint: /entries/top
      Paginated: no
      Description: Get a list of the top 50 entries by likes/dislikes
      Query Parameters: none
      Return JSON:
        Array of max 50 IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Sorted by likes (descending) and dislikes(ascending)
    */
  router.route(`/entries/top`).get(controller.getTopList);

  /*
      API Endpoint: /entries/recent
      Paginated: no
      Description: Get a list of the 10 latest entries added to the directory
      Query Parameters: none
      Return JSON:
        Array of max 10 IEntry objects with some fields excluded (check EntryModel.GetEntries select method)
        Sorted by added date
    */
  router.route(`/entries/recent`).get(controller.getRecentList);

  /*
      API Endpoint: /entries/random
      Paginated: no
      Description: Get a random IEntry
      Query Parameters: none
      Return JSON:
        A random IEntry
    */
  router.route(`/entries/random`).get(controller.getRandom);
}
