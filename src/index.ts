import express, { Express } from "express";
import StartConfigs from "@/loaders/startConfigs";

function StartServer() {
  const app: Express = express();

  StartConfigs(app);

  app.listen(4444);
}

StartServer();

