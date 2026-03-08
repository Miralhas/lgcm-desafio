import { Sample } from "src/api/schemas/sample.schema.js";

export interface ISampleRepository {
  create(sample: Sample): Promise<Sample | undefined>;
  findAll(): Promise<Sample[]>;
  findById(id: Sample['id']): Promise<Sample | undefined>;
  update(id: Sample['id'], sample: Sample): Promise<Sample | undefined>;
  delete(id: Sample["id"]): Promise<void>;
}