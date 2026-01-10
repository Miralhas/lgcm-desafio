import { Sample, SampleDTO } from "../schemas/sample.schema";

export class SampleMapper {
  static toResponse(sample: Sample): SampleDTO {
    const { name } = sample;
    return { name }
  }
}