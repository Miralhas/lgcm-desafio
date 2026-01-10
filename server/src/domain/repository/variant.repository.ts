import { Sample } from "src/api/schemas/sample.schema";
import { CreateVariantInput, Variant } from "src/api/schemas/variant.schema";

export interface IVariantRepository {
  create(post: CreateVariantInput, sampleId: Sample["id"]): Promise<Variant | undefined>;
  findAll(): Promise<Variant[]>;
  findById(id: Variant['id']): Promise<Variant | undefined>;
  // update(id: Sample['id'], post: UpdateSample): Promise<Sample | undefined>;
}