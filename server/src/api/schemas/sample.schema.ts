import Type, { Static } from "typebox";

export const SampleId = Type.Object({ id: Type.String({ format: "uuid" }) });

export const CreateSampleSchema = Type.Object({
  name: Type.String(),
});

export const SampleSchema = Type.Intersect([
  SampleId,
  CreateSampleSchema
]);

export type CreateSampleInput = Static<typeof CreateSampleSchema>;
export type Sample = Static<typeof SampleSchema>;

export type SampleDTO = Omit<Sample, "id">;