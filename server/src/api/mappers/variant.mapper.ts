import { CreateVariantInput, Variant, VariantDTO } from "../schemas/variant.schema.js";

export class VariantMapper {
  static toResponse(variant: Variant): VariantDTO {
    return { ...variant }
  }

  static toSummaryResponse({ classification, gene, id }: Variant | CreateVariantInput): Omit<Variant, "sampleId"> {
    return { classification, gene, id };
  }
}