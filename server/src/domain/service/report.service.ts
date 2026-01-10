import { Report } from "src/api/schemas/report.schema";
import { Sample } from "src/api/schemas/sample.schema";
import { SampleService } from "./sample.service";
import { Variant } from "src/api/schemas/variant.schema";

export class ReportService {
  constructor(private readonly sampleService: SampleService) { }

  async generatePreview(sampleId: Sample["id"], notes?: string): Promise<Report> {
    const sample = await this.sampleService.findByIdOrException(sampleId);
    const summary = this.#generateSummary(sample.variants);

    return {
      generatedAt: new Date().toISOString(),
      highlightedVariants: sample.variants,
      notes: notes ?? "Generated Notes",
      sampleId,
      statistics: { benign: 1, pathogenic: 1, vus: 1 },
      summary: summary
    }
  }

  #generateSummary(variants: Omit<Variant, "sampleId">[]): string {
    if (variants.length <= 0) {
      return "No variants were found."
    }

    const pathogenicSize = variants.filter(v => v.classification === "pathogenic").length;
    const benignSize = variants.filter(v => v.classification === "pathogenic").length;
    const vusSize = variants.filter(v => v.classification === "pathogenic").length;

    const message = `${variants.length} variants were found: ${pathogenicSize} pathogenic, ${benignSize} benign, and ${vusSize} VUS.`
    return message;
  }
}