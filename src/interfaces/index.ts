import { Request } from "express";

export interface TypedRequestBody<T = any> extends Express.Request {
  body: T
}


