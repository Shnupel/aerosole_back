import mongoose from "mongoose";
import { mongoConfig } from "@/configs/mongo.config";

export const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoConfig());
    console.log("DB start");
  }
  catch (e) {
    console.error(e);
  }
}

export default connectToMongo;
