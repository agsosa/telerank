import Job from "scrapers/jobs/Job";
import IJobOptions from "scrapers/jobs/IJobOptions";

// Refresh the Telegram information (title, description, member count, photo, etc) for all the saved entries in the database
// TODO: Save the difference of members since the last run to display later on stats panel/graph
export default class RefreshEntriesTelegramInfosJob extends Job {
  constructor() {
    const options: IJobOptions = {
      useRetry: true,
      maxRetries: 3,
      name: "RefreshEntriesTelegramInfosJob",
      runIntervalMinutes: 60 * 8,
      isConcurrent: false,
    };

    super(options);
  }

  async run(): Promise<void> {
    super.run();

    // TODO: Implement
    this.onSuccess();
  }
}
