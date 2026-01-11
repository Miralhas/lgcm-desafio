import { Sample } from "src/api/schemas/sample.schema";

export interface ISampleRepository {
  create(sample: Sample): Promise<Sample | undefined>;
  findAll(): Promise<Sample[]>;
  findById(id: Sample['id']): Promise<Sample | undefined>;
  // update(id: Sample['id'], post: UpdateSample): Promise<Sample | undefined>;
}