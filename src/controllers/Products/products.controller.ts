import { Router, NextFunction, Request, Response } from "express";
import { HttpMessages } from "@/constants";
import ProductService from "./product.service";
import { AddProductDto } from "@/controllers/Products/dto/addProduct.dto";
import { TypedRequestBody } from "@/interfaces";
import { HttpException } from "@/utils/HttpException";
import { HttpStatus } from "@/utils/HttpException/HttpStatus";

const router = Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductService.getOne(req.params.id);

    if(!product) throw new HttpException(HttpMessages.NOT_FOUND, HttpStatus.NOT_FOUND);

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (e) {
    next(e);
  }
});

router.post("/add", async (req: TypedRequestBody<AddProductDto>, res: Response, next) => {
  try {
    const product = await ProductService.addProduct(req.body);
    // if(!product) throw new HttpException()
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e
    })
  }
});

export default router;
