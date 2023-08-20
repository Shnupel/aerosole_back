import { Router } from "express";
import UserRouter from "./Users/user.controller";
import ProductRouter from "./Products/products.controller";

const router = Router();

router.use("/users", UserRouter);

router.use("/products", ProductRouter);

export default router;
