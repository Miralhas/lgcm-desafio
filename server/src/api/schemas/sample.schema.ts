import Type, { Static } from "typebox";
import { CreateVariantSchema } from "./variant.schema.js";

export const SampleId = Type.Object({ id: Type.String({ format: "uuid" }) });

export const CreateSampleSchema = Type.Object({
  name: Type.String(),
  variants: Type.Array(CreateVariantSchema, { minItems: 1 })
});

export const SampleSchema = Type.Intersect([
  SampleId,
  CreateSampleSchema
]);

export const UpdateSampleSchema = Type.Object({
  name: Type.String(),
})

export type CreateSampleInput = Static<typeof CreateSampleSchema>;
export type UpdateSampleInput = Static<typeof UpdateSampleSchema>;

export type Sample = Static<typeof SampleSchema>;

export type SampleDTO = Sample;