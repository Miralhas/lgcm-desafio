import { classificationEnum } from "src/infrastructure/db/schemas";
import Type, { Static } from "typebox";
import { SampleId } from "./sample.schema";

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
  Type.Object({ sampleId: SampleId.properties.id })
]);

export type CreateVariantInput = Static<typeof CreateVariantSchema>;
export type Variant = Static<typeof VariantSchema>;

export type VariantDTO = Variant;