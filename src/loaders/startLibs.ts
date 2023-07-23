import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectToMongo from "@/loaders/startMongo";

async function  StartLibs(app: Application) {
  app.use(bodyParser());

  app.use(cors());

  await connectToMongo();
}

export default StartLibs;
