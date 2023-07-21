import { Application } from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import controllers from "@/controllers";
import connectToMongo from "@/loaders/startMongo";

async function StartConfigs(app: Application) {
  configDotenv();

  await connectToMongo();

  app.use(bodyParser());

  app.use("/", controllers);
}

export default StartConfigs;
