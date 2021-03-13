import mongoose from "mongoose";
import { log } from "../lib/Helpers";

const mongoURL = "mongodb://localhost/telerank";

export default function InitializeDatabase(): void {
  mongoose.connect(
    mongoURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        log.error(`mongoose.connect failed on startup - retrying\n${err}`);
        setTimeout(InitializeDatabase, 3000);
      } else {
        mongoose.Promise = global.Promise;
        const db = mongoose.connection;
        db.on("error", (e) => log.error(e));
      }
    }
  );
}
