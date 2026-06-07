import mongoose from "mongoose";
import dns from "dns";
import { logger } from "./logger";
import config from "../config/environment";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const connectDB = async () => {
  await mongoose
    .connect(config.database as string)
    .then(() => {
      logger.info("Connected to mongoDB");
    })
    .catch((error) => {
      logger.error(`Couldn't connect to MongoDB: \n${error}`);
      process.exit(1);
    });
};

connectDB();
