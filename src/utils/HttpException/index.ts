import { HttpStatus } from "./HttpStatus";

export default class HttpException extends Error {
  private readonly code: HttpStatus;
  constructor(
    message: string,
    httpCode: HttpStatus
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

export { HttpStatus } from "./HttpStatus";
