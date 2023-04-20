import { join } from "node:path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { config } from "./config.js";
import { api } from "./api.js";
import { errorHandler } from "./middlewares.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.static(join("src", "public")));
app.use(express.json());

app.use("/api", api);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Connecting to the database...`);

  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log(`\n${new Date().toISOString()}`);
    console.log(`Connected to the database.`);
    console.log(`Server listening on port http://localhost:${PORT}...`);
  });
});