import type { Variant } from "./variant";

export interface Sample {
  id: string;
  name: string;
  variants: Variant[];
}