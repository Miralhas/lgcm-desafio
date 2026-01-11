import { BaseException } from "./base-exception";

export class ReportAlreadyExists extends BaseException {
  statusCode = 409;

  constructor(id: string) {
    const message = `Report for sample of id '${id}' already exists.`
    super(message);
    this.name = 'ReportAlreadyExists';
  }
}