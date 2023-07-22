import { Schema, Model, model } from "mongoose";
import { IProduct } from "./interfaces";

const userSchema = new Schema<IProduct, Model<IProduct>>({
  title: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  oldCost: {
    type: Number,
    required: false
  },
  brand: {
    type: String,
    required: true
  },
  manufacturerCountry: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  overImages: {
    type: [String],
    required: false
  },
  colors: {
    type: [{
      name: {
        type: String,
        required: true
      },
      img: {
        type: [String],
        required: true
      },
      iconHex: {
        type: String,
        required: true
      }
    }],
    required: true
  },
  overParams: {
    type: {},
    required: false
  }
}, {
  timestamps: true
});

const ProductModel = model<IProduct>("Products", userSchema);

export { IProduct } from "./interfaces";
export default ProductModel;
