import { Document, Model } from "mongoose";
import { IProduct } from "@/dbModels/Product";
import { AddProductDto } from "@/controllers/Products/dto/addProduct.dto";

export default class ProductService {
  private readonly ProductModel: Model<IProduct>;
  constructor(ProductModel: Model<IProduct>) {
    this.ProductModel = ProductModel;
  }

  async getMany({ limit, howSkip }: { limit: number, howSkip: number }): Promise<Document<IProduct>[]>{
    return await this.ProductModel.find().skip(howSkip).limit(limit).exec();
  }

  async getOne(id: string): Promise<Document<IProduct> | null> {
    return await this.ProductModel.findById(id).exec();
  }

  async addProduct(dto: AddProductDto): Promise<Document<IProduct> | null> {
    const newProduct = new this.ProductModel(dto);
    await newProduct.save();
    return newProduct;
  }

  async updateProduct(id: number, fields: { [key: string]: string }): Promise<Document<IProduct> | null> {
    return this.ProductModel.findOneAndUpdate(
      { _id: id },
      { ...fields },
      { new: true }
    );
  }

  async deleteProduct(id: string): Promise<any> {
    return this.ProductModel.findByIdAndDelete(id).exec();
  }
}
