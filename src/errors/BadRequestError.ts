import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  constructor(message: string = "Invalid Request") {
    super(400, message);
  }
}
