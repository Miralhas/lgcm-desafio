import { BaseException } from "./base-exception";

export class VariantAlreadyExists extends BaseException {
  statusCode = 409;

  constructor(id: string) {
    const message = `Variant with id ${id} already exists!`
    super(message);
    this.name = 'NotFoundException';
  }
}