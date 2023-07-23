import { Router, Request, Response } from "express";
import UserService from "./user.service";
import RequestTyped from "@/interfaces/queries/RequestTyped";

const router = Router();

router.get("/", (req: RequestTyped, res: Response) => {
  res.send("sf");
});

export default router;
