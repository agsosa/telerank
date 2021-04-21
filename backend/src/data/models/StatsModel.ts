import moment from "moment";
import * as EntryModel from "data/models/entry-model/EntryModel";
import { log } from "lib/Helpers";
import IStats from "data/models/IStats";

const STATS_CACHE_EXPIRATION_SECONDS = 5 * 60;

interface IStatsObj {
  expirationTime: moment.Moment | null;
  data: IStats;
}

const stats: IStatsObj = {
  expirationTime: null,
  data: {
    channels: 0,
    groups: 0,
    stickers: 0,
    spanish: 0,
    english: 0,
    members: 0,
    ratings: 0,
    featured: 0,
    removed: 0,
    pending: 0,
    bots: 0,
    views: 0,
  },
};

function GetStatsFromDatabase(): Promise<IStats> {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      const project = {
        channels: { $arrayElemAt: ["$channels.Channel", 0] },
        groups: { $arrayElemAt: ["$groups.Group", 0] },
        bots: { $arrayElemAt: ["$bots.Bot", 0] },
        stickers: { $arrayElemAt: ["$stickers.Sticker", 0] },
        spanish: { $arrayElemAt: ["$spanish.spanish", 0] },
        english: { $arrayElemAt: ["$english.english", 0] },
        members: { $arrayElemAt: ["$members.members", 0] },
        ratings: { $arrayElemAt: ["$ratings.ratings", 0] },
        featured: { $arrayElemAt: ["$featured.featured", 0] },
        removed: { $arrayElemAt: ["$removed.removed", 0] },
        pending: { $arrayElemAt: ["$pending.pending", 0] },
        views: { $arrayElemAt: ["$views.views", 0] },
      };

      const result: IStats = await EntryModel.EntryModel.aggregate([
        {
          $facet: {
            channels: [{ $match: { type: "Channel" } }, { $count: "Channel" }],
            groups: [{ $match: { type: "Group" } }, { $count: "Group" }],
            bots: [{ $match: { type: "Bot" } }, { $count: "Bot" }],
            stickers: [{ $match: { type: "Sticker" } }, { $count: "Sticker" }],
            spanish: [{ $match: { language: "es" } }, { $count: "spanish" }],
            english: [{ $match: { language: "en" } }, { $count: "english" }],
            members: [{ $group: { _id: null, members: { $sum: "$members" } } }],
            ratings: [
              {
                $group: {
                  _id: null,
                  ratings: { $sum: { $add: ["$likes", "$dislikes"] } },
                },
              },
            ],
            featured: [{ $match: { featured: true } }, { $count: "featured" }],
            pending: [{ $match: { pending: true } }, { $count: "pending" }],
            removed: [{ $match: { removed: true } }, { $count: "removed" }],
            views: [{ $group: { _id: null, views: { $sum: "$views" } } }],
          },
        },
        {
          $project: project,
        },
      ]).then((aggResult) => aggResult[0]);

      // Set undefined fields to 0
      Object.keys(project).forEach((k) => {
        const key = k as keyof IStats;
        if (!result[key]) result[key] = 0;
      });

      // Resolve
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

/*
 * Returns a IStats object from database or cache.
 */
export function GetStats(): Promise<IStats> {
  return new Promise((resolve) => {
    const cacheSecondsRemaining = stats.expirationTime
      ? moment(stats.expirationTime).diff(moment.now(), "seconds")
      : 0;

    if (!stats.data || cacheSecondsRemaining <= 0) {
      // Get from database if cache is not valid
      GetStatsFromDatabase()
        .then((data) => {
          stats.data = data;
          stats.expirationTime = moment().add(
            STATS_CACHE_EXPIRATION_SECONDS,
            "seconds"
          );

          resolve(stats.data);
        })
        .catch((error) => {
          log.error(`GetStats error: ${error}`);
          resolve(stats.data); // Resolve with cache on error
        });
    } else {
      // Cache is still valid, return cache
      resolve(stats.data);
    }
  });
}
