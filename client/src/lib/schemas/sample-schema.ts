import { classifications } from "@/types/variant";
import * as z from "zod"

const variantSchema = z.object({
  id: z.string().min(1, "Variant id must be at least 1 character long."),
  gene: z.string().min(1, "Variant id must be at least 1 character long."),
  classification: z.enum([...classifications])
});

export const sampleSchema = z.object({
  name: z
    .string()
    .min(1, "Sample name must be at least 1 character long."),
  variants: z
    .array(variantSchema).min(1, "Add at least one variant."),
});

export type SampleInput = z.infer<typeof sampleSchema>;
export type VariantInput = z.infer<typeof variantSchema>;