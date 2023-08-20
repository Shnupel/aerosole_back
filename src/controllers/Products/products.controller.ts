import { NextFunction, Request, Response, Router } from "express";
import { HttpMessages } from "@/constants/messages";
import HttpException, { HttpStatus } from "@/utils/HttpException";
import ProductModel from "@/dbModels/Product";
import { AddProductDto } from "@/controllers/Products/dto/addProduct.dto";
import RequestTyped from "@/interfaces/queries/RequestTyped";
import ProductService from "./product.service";

const router = Router();

const productService = new ProductService(ProductModel);

router.get("/", async (req: RequestTyped<{ limit: number, paginate: number }>, res: Response, next: NextFunction) => {
  try {
    const { limit = 20, paginate = 1 } = req.body;
    const howSkip = (paginate - 1) * limit;
    const products = await productService.getMany({ limit, howSkip });
    res.status(HttpStatus.OK).json({
      success: true,
      data: products
    })
  } catch (e) {
    next(e);
  }
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.getOne(req.params.id);
    console.log(product);
    if(!product) new HttpException(HttpMessages.NOT_FOUND, HttpStatus.NOT_FOUND);

    res.status(HttpStatus.OK).json({
      success: true,
      data: product
    })
  } catch (e) {
    next(e);
  }
});

router.post("/create", async (req: RequestTyped<AddProductDto>, res: Response, next: NextFunction) => {
  try {
    const product = await productService.addProduct(req.body);

    if(!product) new HttpException(HttpMessages.CAN_NOT_CREATE, HttpStatus.INTERNAL_SERVER_ERROR);

    res.status(HttpStatus.CREATED).json({
      success: true,
      data: product
    });
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req: RequestTyped, res: Response, next: NextFunction) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    res.status(202).json({
      success: true,
      data: updatedProduct
    });
  } catch (e) {
    next(e);
  }
})

router.delete("/:id", async (req: RequestTyped, res: Response, next) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    res.status(200).json({
      success: true,
      data: deletedProduct
    })
  } catch (e) {
    next(e);
  }
})

export default router;
