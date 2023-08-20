import HttpException  from "@/utils/HttpException";
import { NextFunction, Response, Request } from "express";

function HandleError(err: Error, req: Request, res: Response, next: NextFunction){
  if(err instanceof HttpException){
    return res.status(err.getCode()).json({
      success: false,
      message: err.getMessage()
    })
  }

  return res.status(500).json({
    success: false,
    message: err.message
  });
}

export default HandleError;
