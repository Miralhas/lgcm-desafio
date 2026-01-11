export const classifications = ["vus", "benign", "pathogenic"] as const;

export type Classification = typeof classifications[number];

export type Variant = {
  id: string;
  gene: string;
  classification: Classification;
  sampleId: string;
}