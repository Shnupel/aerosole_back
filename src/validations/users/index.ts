import { body, header } from "express-validator";
import { ValidationErrors } from "@/constants/messages";

const GetUser = [
  header("authorization", ValidationErrors.NO_TOKEN()).isString()
]

const CreateUser = [
  body("name", ValidationErrors.NO_FIELD("name")).isString().isLength({ min: 3 }),
  body("login", ValidationErrors.NO_FIELD("login")).isString(),
  body("email", ValidationErrors.NO_FIELD("email")).isEmail().optional(),
  body("password", ValidationErrors.NO_FIELD("password")).isString()
]

const LoginUser = [
  body("email", ValidationErrors.NO_FIELD("email")).isEmail(),
  body("password", ValidationErrors.NO_FIELD("password")).isString()
]

const AddProduct = [
  header("authorization", ValidationErrors.NO_TOKEN()).isString(),
  body("productId", ValidationErrors.NO_FIELD("productId")).isArray()
]

const UpdateUserData = [
  header("authorization", ValidationErrors.NO_TOKEN()).isString(),
  body("email").isString().optional(),
  body("number").isNumeric().optional()
]

const DeleteUser = [
  header("authorization", ValidationErrors.NO_TOKEN()).isString(),
]

export default { GetUser, CreateUser, LoginUser, AddProduct, UpdateUserData, DeleteUser };
