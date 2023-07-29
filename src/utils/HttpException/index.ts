import { HttpStatus } from "./HttpStatus";

export { HttpStatus } from "./HttpStatus";

export default class HttpException extends Error {
  private readonly code: number;
  constructor(
    message: string,
    httpCode: number
  ) {
    super(message);
    this.message = message;
    this.code = httpCode;
  }

  getCode() {
    return this.code;
  }

  getMessage(){
    return this.message;
  }
}
