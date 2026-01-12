import { classificationEnum } from "src/infrastructure/db/schemas.js";
import Type, { Static } from "typebox";

export const VariantId = Type.Object({ id: Type.String() });

export const CreateVariantSchema = Type.Intersect([
  VariantId,
  Type.Object({
    gene: Type.String(),
    classification: Type.Enum(classificationEnum)
  })
]);

export const VariantSchema = Type.Intersect([
  CreateVariantSchema,
  Type.Object({ sampleId: Type.String({format: "uuid"}) })
]);

export type CreateVariantInput = Static<typeof CreateVariantSchema>;
export type Variant = Static<typeof VariantSchema>;

export type VariantDTO = Variant;