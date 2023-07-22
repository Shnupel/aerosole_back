import mongoose from "mongoose";

export interface IProduct extends mongoose.Document {
  title: string,
  cost: number,
  oldCost?: number,
  brand: string,
  manufacturerCountry: string,
  description: string,
  weight: string,
  tags: string[],
  overImages?: string[]
  colors: IProductColor[]
  overParams: {
    [key: string]: string
  }
}

interface IProductColor {
  name: string,
  img: string[],
  iconHex: string
}
