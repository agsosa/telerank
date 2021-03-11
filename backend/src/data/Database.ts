import mongoose from "mongoose";

const mongoURL = "mongodb://localhost/telerank";

export default function InitializeDatabase(): void {
  mongoose.connect(mongoURL);
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error: "));
}
