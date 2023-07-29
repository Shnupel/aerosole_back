import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import connectToMongo from "@/loaders/startMongo";
import { helmetConfig } from "@/configs/helmet.config";


async function  StartLibs(app: Application) {
  app.use(bodyParser());

  app.use(cors());

  app.use(helmet(helmetConfig));

  await connectToMongo();
}

export default StartLibs;
