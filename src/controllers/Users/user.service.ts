import { Document, Model, Types } from "mongoose";
import { IUser } from "@/dbModels/User";
import { CreateUserDto } from "@/controllers/Users/dto/createUser.dto";
import { genSalt, hash } from "bcrypt";
import HttpException, { HttpStatus } from "@/utils/HttpException";
import { HttpMessages } from "@/constants/messages";

export default class User {
  private readonly UserModel: Model<IUser>;
  constructor(private userModel: Model<IUser>) {
    this.UserModel = userModel;
  }

  async getUserById(id: number): Promise<Document<IUser> | null> {
    return this.UserModel.findById(id).populate("products").exec();
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return this.UserModel.findOne({ email: email }).exec();
  }

  async createUser(dto: CreateUserDto): Promise<IUser> {
    const salt = await genSalt(10);
    const passwordHash = await hash(dto.password, salt);
    const newUser = new this.UserModel({ ...dto, passwordHash });
    return newUser.save();
  }

  async updateUser({ email, number }: { email: string, number: number }, id: number): Promise<IUser | null> {
    return this.UserModel.findByIdAndUpdate(
      id,
      { email, number },
      { new: true }
    );
  }

  async addProduct(_productId: string[], userId: number): Promise<Document<IUser> | null> {
    const user = await this.UserModel.findById(userId).exec();
    if(!user) throw new HttpException(HttpMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
    const productsId = _productId.map(value => new Types.ObjectId(value));
    user["products"] = [...user["products"], ...productsId];
    await user.save();
    return user.populate("products");
  }

  async deleteProduct(userId: string, productId: string, products: string[]): Promise<Document<IUser> | null> {
    const user = await this.UserModel.findById(userId).exec();
    if (!user) throw new HttpException(HttpMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
    user["products"] = products;
    await user.save();
    return user.populate("products");
  }
}
