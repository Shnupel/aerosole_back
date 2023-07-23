import { Application } from "express";
import { configDotenv } from "dotenv";
import StartLibs from "@/loaders/startLibs";
import controllers from "@/controllers";
import HandleError from "@/middlewares/HandleError.middleware";

async function StartConfigs(app: Application) {
  configDotenv();

  await StartLibs(app);

  app.use("/api", controllers);

  app.use(HandleError);
}

export default StartConfigs;
