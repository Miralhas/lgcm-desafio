import { classificationEnum } from "src/infrastructure/db/schemas";
import Type, { Static } from "typebox";

export const CreateReportSchema = Type.Object({
  sampleId: Type.String({ format: "uuid" }),
  notes: Type.Optional(Type.String())
});

export const ReportSchema = Type.Object({
  sampleId: Type.String({ format: "uuid" }),
  summary: Type.String(),
  statistics: Type.Object({
    pathogenic: Type.Number(),
    benign: Type.Number(),
    vus: Type.Number()
  }),
  highlightedVariants: Type.Array(Type.Object({
    id: Type.String(),
    gene: Type.String(),
    classification: Type.Enum(classificationEnum)
  })),
  notes: Type.Optional(Type.String()),
  generatedAt: Type.String({ format: "date-time" })
});

export type Report = Static<typeof ReportSchema>;