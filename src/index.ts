import express, { Express } from "express";
import StartConfigs from "@/loaders/startConfigs";

async function StartServer() {
  const app: Express = express();

  await StartConfigs(app);

  app.listen(4444);

  app.get("/", (req, res) => res.send("hello world"))
}

StartServer();

