import { log } from "../../lib/Helpers";
import IJobOptions from "./IJobOptions";

const defaultOptions: IJobOptions = {
  name: "UnnamedJob",
  maxRetries: 3,
  useRetry: true,
  runIntervalMinutes: 60,
  isConcurrent: false,
};

export default abstract class Job {
  startDate: Date | undefined; // Date of last run()

  currentRetries = 0;

  isRunning: boolean;

  options: IJobOptions;

  constructor(options: IJobOptions = defaultOptions) {
    this.startDate = undefined;
    this.isRunning = false;

    this.options = options;
  }

  async run(): Promise<void> {
    this.startDate = new Date();
    this.isRunning = true;
    log.info(`Running job: ${this.options.name}`);
  }

  protected onError(err: any): void {
    log.error(`${this.options.name} failed with error ${err}`);
    this.isRunning = false;
    if (
      this.options.useRetry &&
      this.currentRetries < this.options.maxRetries
    ) {
      log.info(
        `Retrying ${this.options.name}. Retries: ${this.currentRetries}/${this.options.maxRetries}`
      );
      this.run();
    } else this.currentRetries = 0;
  }

  protected onSuccess(...args: any): void {
    this.isRunning = false;
    this.currentRetries = 0;
  }
}
