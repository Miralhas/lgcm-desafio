import { Report, ReportDTO, ReportInput, ReportStatisticsType } from "src/api/schemas/report.schema.js";
import { Sample } from "src/api/schemas/sample.schema.js";
import { Variant } from "src/api/schemas/variant.schema.js";
import { isUniqueConstraintError } from "src/utils/map-error.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ReportAlreadyExists } from "../exceptions/report-already-exists.js";
import { IReportRepository } from "../repository/reports.repository.js";
import { SampleService } from "./sample.service.js";

export class ReportService {
  constructor(
    private readonly sampleService: SampleService,
    private readonly reportRepository: IReportRepository
  ) { }

  async findByIdOrException(id: Report["sampleId"]) {
    const report = await this.reportRepository.findById(id);
    this.handleNotFound(report, id);
    const sample = await this.sampleService.findByIdOrException(id);
    return { ...report, highlightedVariants: sample.variants, }
  }

  async generatePreview(sampleId: Sample["id"], notes?: string): Promise<ReportDTO> {
    const sample = await this.sampleService.findByIdOrException(sampleId);

    return {
      sampleId,
      summary: this.generateSummary(sample.variants),
      statistics: this.getVariantsStats(sample.variants),
      highlightedVariants: sample.variants,
      notes: notes ?? this.generateNotes(sample.variants, sampleId),
      generatedAt: new Date().toISOString(),
    }
  }

  async create(input: ReportInput) {
    let notes = input.notes;
    const sample = await this.sampleService.findByIdOrException(input.sampleId);
    const statistics = this.getVariantsStats(sample.variants);
    const summary = this.generateSummary(sample.variants);

    if (!notes) {
      notes = this.generateNotes(sample.variants, input.sampleId);
    }

    try {
      const report = await this.reportRepository.create({ statistics, notes, sampleId: input.sampleId, summary, })
      return { ...report, highlightedVariants: sample.variants, }
    } catch (err) {
      if (isUniqueConstraintError(err)) {
        throw new ReportAlreadyExists(input.sampleId);
      }
      throw err;
    }
  }

  private getVariantsStats(variants: Omit<Variant, "sampleId">[]): ReportStatisticsType {
    const pathogenic = variants.filter(v => v.classification === "pathogenic").length;
    const benign = variants.filter(v => v.classification === "benign").length;
    const vus = variants.filter(v => v.classification === "vus").length;

    return { pathogenic, benign, vus };
  }

  private generateNotes(variants: Omit<Variant, "sampleId">[], sampleId: Sample["id"]) {
    const { benign, pathogenic, vus } = this.getVariantsStats(variants);
    return `Report for sample of id '${sampleId}' has a total of ${variants.length} with ${pathogenic} pathogenic, ${vus} vus, and ${benign} benign`
  }

  private generateSummary(variants: Omit<Variant, "sampleId">[]): string {
    if (variants.length <= 0) {
      return "No variants were found."
    }

    const { benign, pathogenic, vus } = this.getVariantsStats(variants);

    const message = `${variants.length} variants were found: ${pathogenic} pathogenic, ${benign} benign, and ${vus} VUS.`
    return message;
  }

  private handleNotFound(report: Report | undefined, id: Report['sampleId']): asserts report is Report {
    if (!report) throw new NotFoundException(`Report with id ${id} not found`);
  }
}