import { CreateSampleInput, Sample, SampleDTO } from "../schemas/sample.schema.js";

export class SampleMapper {
  static toResponse(sample: Sample): SampleDTO {
    return { ...sample }
  }

  static toDomain(input: CreateSampleInput): Sample {
    return { ...input } as Sample
  }
}