import { Router, Response, NextFunction } from "express";
import RequestTyped from "@/interfaces/queries/RequestTyped";

import bcrypt from "bcrypt";

import validator from "@/validations";
import UsersValidation from "@/validations/users";

import HttpException, { HttpStatus } from "@/utils/HttpException";
import { HttpMessages } from "@/constants/messages";

import UserModel from "@/dbModels/User";

import UserService from "./user.service";
import { CreateUserDto } from "@/controllers/Users/dto/createUser.dto";
import jwt from "jsonwebtoken";
import ValidateToken from "@/middlewares/ValidateToken.middleware";

const router = Router();

const userService = new UserService(UserModel);

router.get("/",
  UsersValidation.GetUser,
  validator,
  ValidateToken,
  async (req: RequestTyped, res: Response, next: NextFunction) => {
  try {
    const { id } = req["token"];
    const user = await userService.getUserById(id);

    if(!user) throw new HttpException(HttpMessages.NOT_FOUND, HttpStatus.NOT_FOUND);

    res.status(HttpStatus.OK).json({
      success: true,
      data: user
    })
  } catch (e) {
    next(e);
  }
});

router.post("/auth",
  UsersValidation.LoginUser,
  validator,
  async (req: RequestTyped, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);

    if(JSON.stringify(user) === "{}") throw new HttpException(HttpMessages.NOT_FOUND, HttpStatus.NOT_FOUND);

    const isMatch = await bcrypt.compare(password, user!.passwordHash);

    if(!isMatch) throw new HttpException(HttpMessages.LOGIN_OR_PASSWORD_IS_NOT_MATCH, HttpStatus.BAD_REQUEST);

    const token = jwt.sign(
      { id: user!._id, role: user?.role || "user"  },
      process.env.SECRET_KEY,
      { expiresIn: "30m" }
    )
    res.json({
      success: true,
      token: token
    })
  } catch (e) {
    next(e);
  }
});

router.post("/create",
  UsersValidation.CreateUser,
  validator,
  async (req: RequestTyped<CreateUserDto>, res: Response, next: NextFunction) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(HttpStatus.CREATED).json({
      success: true,
      data: newUser
    });
  } catch (e) {
    next(e);
  }
});

router.post("/addProduct/:id",
  UsersValidation.AddProduct,
  validator,
  async (req: RequestTyped<{ productId: string }>, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await userService.addProduct(req.body.productId, req.params.id);
    res.status(HttpStatus.ACCEPTED).json({
      success: true,
      data: updatedUser
    })
  } catch (e) {
    next(e);
  }
});

router.patch("/:id",
  UsersValidation.UpdateUserData,
  validator,
  async (req: RequestTyped<{ email: string, number: number }>, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await userService.updateUser(req.body, req.params.id);
    res.status(HttpStatus.ACCEPTED).json({
      success: true,
      data: updatedUser
    })
  } catch (e) {
    next(e);
  }
});

router.delete("/:id",
  UsersValidation.DeleteUser,
  validator,
  async (req: RequestTyped, res: Response, next: NextFunction) =>  {
  try {
    const deletedProduct = await userService.deleteProduct(req.params.id);
    res.status(HttpStatus.OK).json({
      success: true,
      data: deletedProduct
    })
  } catch (e) {
    next(e);
  }
});

export default router;
