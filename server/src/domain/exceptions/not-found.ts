import { BaseException } from "./base-exception";

export class NotFoundException extends BaseException {
  statusCode = 404;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundException';
  }
}