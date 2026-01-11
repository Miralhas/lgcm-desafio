export const classifications = ["vus", "benign", "pathogenic"] as const;

export type Classification = typeof classifications[number];

export interface Variant {
  id: string;
  gene: string;
  classification: Classification;
  sampleId: string;
}