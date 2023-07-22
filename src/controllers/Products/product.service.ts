import { Document, Model } from "mongoose";
import Product, { IProduct } from "@/dbModels/Product";
import { AddProductDto } from "@/controllers/Products/dto/addProduct.dto";

export default class ProductService {
  private static ProductModel: Model<IProduct>;
  constructor() { }

   static async getOne(id: string): Promise<Document<IProduct> | null> {
    return await this.ProductModel.findById(id).exec();
  }

  static async addProduct(dto: AddProductDto): Promise<Document<IProduct> | null> {
    return null
  }
}
