import Job from "scrapers/jobs/Job";
import IJobOptions from "scrapers/jobs/IJobOptions";

// Refresh the Telegram information (title, description, member count, photo, etc) for all the saved entries in the database
// TODO: Save the difference of members since the last run to display later on stats panel/graph
export default class RefreshEntriesJob extends Job {
  constructor() {
    const options: IJobOptions = {
      useRetry: true,
      maxRetries: 3,
      name: "RefreshEntriesJob",
      runIntervalMinutes: 60 * 8,
      isConcurrent: false,
    };

    super(options);
  }

  async runJob(): Promise<void> {
    // TODO: Implement
    this.onSuccess();
  }
}
