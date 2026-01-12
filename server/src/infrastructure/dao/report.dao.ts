import { CreateReport, Report } from "src/api/schemas/report.schema.js";
import { IReportRepository } from "src/domain/repository/reports.repository.js";
import { DB } from "../db/index.js";
import { reports } from "../db/schemas.js";
import { Sample } from "src/api/schemas/sample.schema.js";

export class ReportDAO implements IReportRepository {
  constructor(private readonly db: DB) { }

  async create(input: CreateReport): Promise<Report | undefined> {
    const res = await this.db.insert(reports).values(input).returning()
    return res[0];
  }

  async findById(id: Sample["id"]): Promise<Report | undefined> {
    return await this.db.query.reports.findFirst({ where: { sampleId: id } });
  }
}