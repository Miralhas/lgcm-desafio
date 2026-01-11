import type { Variant } from "./variant";

export type Statistics = {
  pathogenic: number;
  benign: number;
  vus: number;
}

export type Report = {
  sampleId: string
  summary: string
  statistics: Statistics
  highlightedVariants: Variant[]
  notes: string
  generatedAt: string
}