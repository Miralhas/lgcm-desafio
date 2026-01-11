import type { Sample } from "@/types/sample";

export const reportKeys = {
  all: ["report"],
  getReportById: (id: Sample["id"]) => [...reportKeys.all, "detail", id]
}