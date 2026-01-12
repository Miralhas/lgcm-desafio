import { Sample } from "src/api/schemas/sample.schema.js";
import { CreateVariantInput, Variant } from "src/api/schemas/variant.schema.js";

export interface IVariantRepository {
  create(post: CreateVariantInput, sampleId: Sample["id"]): Promise<Variant | undefined>;
  findAll(): Promise<Variant[]>;
  findById(id: Variant['id']): Promise<Variant | undefined>;
}