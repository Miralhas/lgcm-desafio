import { Variant, VariantDTO } from "../schemas/variant.schema.js";

export class VariantMapper {
  static toResponse(variant: Variant): VariantDTO {
    return { ...variant }
  }
}