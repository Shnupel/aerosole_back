import express, { Express, Request, Response } from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app: Express = express();

app.listen(4444, () => {
});

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
})

