import { CreateSampleInput, Sample, SampleDTO } from "../schemas/sample.schema.js";
import { VariantMapper } from "./variant.mapper.js";

export class SampleMapper {
  static toResponse(sample: Sample): SampleDTO {
    const variants = sample.variants.map(v => VariantMapper.toSummaryResponse(v));
    return { ...sample, variants }
  }

  static toDomain(input: CreateSampleInput): Sample {
    return { ...input } as Sample
  }
}