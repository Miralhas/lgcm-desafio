import { CreateReport, Report } from "src/api/schemas/report.schema.js";
import { Sample } from "src/api/schemas/sample.schema.js";

export interface IReportRepository {
  create(input: CreateReport): Promise<Report | undefined>;
  findById(id: Sample['id']): Promise<Report | undefined>;
  // update(id: Sample['id'], post: UpdateSample): Promise<Sample | undefined>;
}