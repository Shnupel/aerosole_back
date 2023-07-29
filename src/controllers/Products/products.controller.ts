import { NextFunction, Request, Response, Router } from "express";
import { HttpMessages } from "@/constants";
import HttpException, { HttpStatus } from "@/utils/HttpException";
import ProductModel from "@/dbModels/Product";
import { AddProductDto } from "@/controllers/Products/dto/addProduct.dto";
import RequestTyped from "@/interfaces/queries/RequestTyped";
import ProductService from "./product.service";

const router = Router();

const productModelInstance = new ProductService(ProductModel)

router.get("/", async (req: RequestTyped<{ limit: number, paginate: number }>, res: Response, next: NextFunction) => {
  try {
    const { limit = 20, paginate = 1 } = req.body;
    const howSkip = (paginate - 1) * limit;
    const products = await productModelInstance.getMany({ limit, howSkip });
    res.status(200).json({
      success: true,
      data: products
    })
  } catch (e) {
    next(e);
  }
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModelInstance.getOne(req.params.id);
    console.log(product);
    if(!product) new HttpException(HttpMessages.NOT_FOUND, HttpStatus.NOT_FOUND);

    res.status(HttpStatus.OK).json({
      success: true,
      data: product
    });

  } catch (e) {
    next(e);
  }
});

router.post("/add", async (req: RequestTyped<AddProductDto>, res: Response, next: NextFunction) => {
  try {
    const product = await productModelInstance.addProduct(req.body);

    if(!product) new HttpException(HttpMessages.CAN_NOT_CREATE, HttpStatus.INTERNAL_SERVER_ERROR);

    res.status(HttpStatus.CREATED).json({
      success: true,
      data: product
    });
  } catch (e) {
    next(e);
  }
});



router.delete("/:id", async (req, res, next) => {
  try {
    const deletedProduct = await productModelInstance.deleteProduct(req.params.id);
    res.status(200).json({
      success: true,
      data: deletedProduct
    })
  } catch (e) {
    next(e);
  }
})

export default router;
