import mongoose from "mongoose";

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
        console.error(`mongoose.connect failed on startup - retrying\n${err}`);
        setTimeout(InitializeDatabase, 3000);
      } else {
        mongoose.Promise = global.Promise;
        const db = mongoose.connection;
        db.on(
          "error",
          console.error.bind(console, "MongoDB connection error: ")
        );
      }
    }
  );
}
