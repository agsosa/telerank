import moment from "moment";
import { log } from "lib/Helpers";
import Job from "scrapers/jobs/Job";
import PopulateDatabase from "scrapers/jobs/PopulateDatabaseJob";
import RefreshEntriesTelegramInfos from "scrapers/jobs/RefreshEntriesTelegramInfos";
import { isDatabaseReady } from "data/Database";
import { isTelegramProtoReady } from "scrapers/telegram-proto/TelegramProto";

let interval: NodeJS.Timeout;
const JOBS_INTERVAL_TIME = 15 * 1000; // Time between each jobsInterval() run (ms)
const JOBS: Job[] = [new PopulateDatabase(), new RefreshEntriesTelegramInfos()];

export function getRunningJobs(): string[] {
  return JOBS.filter((k) => k.isRunning).map((k) => k.options.name);
}

export function isAnyJobRunning(): boolean {
  return getRunningJobs().length > 0;
}

function jobsInterval() {
  if (isDatabaseReady() && isTelegramProtoReady()) {
    JOBS.forEach((q) => {
      if (!q.isRunning) {
        if (!q.options.isConcurrent) {
          // If this job is not concurrent, check if there is any job running
          if (!isAnyJobRunning()) {
            // Calculate the minutes elapsed since the last run()
            const diffMinutes = moment().diff(q.startDate, "minutes");
            // Run the job if the minutes elapsed is greater than the interval minutes
            if (!q.startDate || diffMinutes >= q.options.runIntervalMinutes)
              q.run();
          }
        } else q.run(); // Ignore checks for jobs with concurrent = true
      }
    });
  }
}

export function InitializeJobs(): void {
  if (!interval) {
    log.info("Initializing Jobs");
    interval = setInterval(jobsInterval, JOBS_INTERVAL_TIME);
  } else log.error("ScraperJobsManager is already initialized!");
}

export function stopJobs() {}

export function startJobs() {}

export function restartJobs() {}
