import Job from "./Job";

// Refresh the Telegram information (title, description, member count, photo, etc) for all the saved entries in the database
// TODO: Grab the Telegram Info from the telegram-proto module. If the username is now flagged as SCAM by Telegram, update the EntryModel field "removed" to true and skip
// TODO: Save the difference of members since the last run to display later on stats panel/graph
export default class RefreshEntriesTelegramInfosJob extends Job {
  constructor() {
    super(true, "RefreshEntriesTelegramInfosJob", 60 * 8, false);
  }

  async run(): Promise<void> {
    super.run();
  }
}
