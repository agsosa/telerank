export default interface IJobOptions {
  name: string; // Display name
  maxRetries: number;
  useRetry: boolean; // Should retry on error?
  runIntervalMinutes: number; // Minutes between each run()
  isConcurrent: boolean; // Can we run this job while other jobs are running?
}
