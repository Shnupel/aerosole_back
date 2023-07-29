import mongoose, { Schema, model, Types, Model } from "mongoose";

export interface IUser extends mongoose.Document {
  name: string,
  login: string,
  passwordHash: string,
  email?: string
  products: Types.ObjectId[]
}

const userSchema = new Schema<IUser, Model<IUser>>({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  products: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: "Products",
    required: true
  },
  email: {
    type: String,
    required: false
  }
},{
  timestamps: true
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
