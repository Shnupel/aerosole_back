import { NextFunction, Request, Response } from "express";
import { TypedRequestBody } from "@/interfaces";

export const TypingRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {

  next();
}
