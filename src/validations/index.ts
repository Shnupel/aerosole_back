import { Response } from "express";
import RequestTyped from "@/interfaces/queries/RequestTyped";
import { NextFunction } from "express";
import { validationResult } from "express-validator";

const validator = (req: RequestTyped, res: Response, next: NextFunction) => {
  const errors = validationResult.withDefaults({
    formatter: error => error.msg as string
  })(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()
    })
  }
  next();
}

export default validator;
