import { Variant, VariantDTO } from "../schemas/variant.schema";

export class VariantMapper {
  static toResponse(variant: Variant): VariantDTO {
    return { ...variant }
  }
}