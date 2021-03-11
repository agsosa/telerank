import mongoose from "mongoose";
import moment from "moment";
import EntryModel from "./models/EntryModel";

const mongoURL = "mongodb://localhost/telerank";

export default function InitializeDatabase(): void {
  mongoose.connect(mongoURL);
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error: "));
}
