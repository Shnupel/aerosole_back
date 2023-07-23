import { NextFunction, Request, Response, Router } from "express";
import { HttpMessages } from "@/constants";
import HttpException, { HttpStatus } from "@/utils/HttpException";
import ProductModel from "@/dbModels/Product";
import { AddProductDto } from "@/controllers/Products/dto/addProduct.dto";
import RequestTyped from "@/interfaces/queries/RequestTyped";
import ProductService from "./product.service";

const router = Router();

const productModelInstance = new ProductService(ProductModel)

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModelInstance.getOne(req.params.id);

    if(!product) new HttpException(HttpMessages.NOT_FOUND, HttpStatus.NOT_FOUND);

    res.status(HttpStatus.OK).json({
      success: true,
      data: product
    });

  } catch (e) {
    next(e);
  }
});

router.post("/add", async (req: RequestTyped<AddProductDto>, res: Response, next) => {
  try {
    const product = await productModelInstance.addProduct(req.body);

    if(!product) new HttpException("bad error", HttpStatus.BAD_REQUEST);

    res.status(HttpStatus.CREATED).json({
      success: true,
      data: product
    });
  } catch (e) {
    next(e);
  }
});

export default router;
