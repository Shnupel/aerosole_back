import { Types } from "mongoose";

export interface IProduct {
  _id: Types.ObjectId
  title: string,
  cost: number,
  oldCost?: number
}
