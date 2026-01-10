import { Sample, SampleDTO } from "../schemas/sample.schema";

export class SampleMapper {
  static toResponse(sample: Sample): SampleDTO {
    return { ...sample }
  }
}