import { classificationEnum, reports } from "src/infrastructure/db/schemas";
import Type, { Static } from "typebox";

export const ReportStatistics = Type.Object({
  pathogenic: Type.Number(),
  benign: Type.Number(),
  vus: Type.Number(),
})

export const InputSchema = Type.Object({
  sampleId: Type.String({ format: "uuid" }),
  notes: Type.Optional(Type.String())
});

export const CreateReportSchema = Type.Object({
  sampleId: Type.String({ format: 'uuid' }),
  summary: Type.String(),
  statistics: ReportStatistics,
  notes: Type.String(),
})

export const ReportSchema = Type.Object({
  sampleId: Type.String({ format: 'uuid' }),
  summary: Type.String(),
  statistics: ReportStatistics,
  notes: Type.String(),
  generatedAt: Type.String({ format: 'date-time' }),
})

export const ReportDTOSchema = Type.Intersect([
  ReportSchema,
  Type.Object({
    highlightedVariants: Type.Array(Type.Object({
      id: Type.String(),
      gene: Type.String(),
      classification: Type.Enum(classificationEnum)
    })),
  })
])

export type ReportInput = Static<typeof InputSchema>;
export type ReportDTO = Static<typeof ReportDTOSchema>;

export type Report = typeof reports.$inferSelect;

export type CreateReport = Static<typeof CreateReportSchema>

export type ReportStatisticsType = Static<typeof ReportStatistics>;