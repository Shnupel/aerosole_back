import { Application } from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import controllers from "@/controllers";
import connectToMongo from "@/loaders/startMongo";
import { HttpException } from "@/utils/HttpException";

function handleError(err, req, res, next){
  if(err instanceof HttpException){
    return res.status(err.getCode()).json({
      success: false,
      message: err.getMessage()
    })
  }

  return res.status(500).json({
    success: false,
    message: err.message
  })
}

async function StartConfigs(app: Application) {
  configDotenv();

  await connectToMongo();

  app.use(bodyParser());

  app.use("/api", controllers);

  app.use(handleError);
}

export default StartConfigs;
