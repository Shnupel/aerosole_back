import { Router, Request, Response } from "express";
import UserService from "./user.service";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("sf");
});

export default router;
