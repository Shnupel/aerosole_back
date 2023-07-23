import { Document, Model } from "mongoose";
import { IProduct } from "@/dbModels/Product";
import { AddProductDto } from "@/controllers/Products/dto/addProduct.dto";

export default class ProductService {
  private readonly ProductModel: Model<IProduct>;
  constructor(ProductModel: Model<IProduct>) {
    this.ProductModel = ProductModel;
  }

   async getOne(id: string): Promise<Document<IProduct> | null> {
    return await this.ProductModel.findById(id).exec();
  }

  async addProduct(dto: AddProductDto): Promise<Document<IProduct> | null> {
    const newProduct = new this.ProductModel(dto);
    await newProduct.save();
    return newProduct;
  }
}
