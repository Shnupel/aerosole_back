import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import { ValidationErrors } from "@/constants/messages";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if(!token) return res.status(401).json({
    success: false,
    message: ValidationErrors.NO_TOKEN()
  });

  const validatedToken = token.split(' ')[1];

  if (validatedToken === 'null' || !validatedToken) return res.status(401).send({
    success: false,
    message: ValidationErrors.NO_TOKEN()
  });

  req["token"] = jwt.decode(validatedToken, process.env.SECRET_KEY);

  next();
}

export default validateToken;
