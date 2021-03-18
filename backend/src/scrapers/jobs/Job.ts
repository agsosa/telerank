import { log } from "../../lib/Helpers";

export default abstract class Job {
  name: string | "UnnamedJob"; // Display name

  startDate: Date | undefined; // Date of last run()

  useRetry = true; // Should retry on error?

  maxRetries = 3;

  retries = 0;

  isRunning: boolean;

  runIntervalMinutes: number; // Minutes between run()

  concurrent: boolean; // Can we run this job while other jobs are running?

  telegramAuth: undefined; // TODO: Implement multiple TelegramAuth to prevent rate limits

  constructor(
    useRetry: boolean,
    name: string,
    runIntervalMinutes: number,
    concurrent: boolean
  ) {
    this.startDate = undefined;
    this.isRunning = false;
    this.name = name;
    this.runIntervalMinutes = runIntervalMinutes;
    this.concurrent = concurrent;
    if (useRetry) this.useRetry = useRetry;
  }

  async run(): Promise<void> {
    this.startDate = new Date();
    this.isRunning = true;
    log.info(`Running job: ${this.name}`);
  }

  protected onError(err: any): void {
    log.error(`${this.name} failed with error ${err}`);
    this.isRunning = false;
    if (this.useRetry && this.retries < this.maxRetries) {
      log.info(
        `Retrying ${this.name}. Retries: ${this.retries}/${this.maxRetries}`
      );
      this.run();
    } else this.retries = 0;
  }

  protected onSuccess(...args: any): void {
    this.isRunning = false;
    this.retries = 0;
  }
}
