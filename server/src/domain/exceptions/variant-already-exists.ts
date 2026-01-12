import { BaseException } from "./base-exception.js";

export class VariantAlreadyExists extends BaseException {
  statusCode = 409;

  constructor(id: string) {
    const message = `Variant of id '${id}' already exists.`
    super(message);
    this.name = 'VariantAlreadyExists';
  }
}