import type { Report } from "@/types/report";
import type { Sample } from "@/types/sample";
import axios from "axios";

export const reportPreview = async ({ id, notes }: { id: Sample["id"]; notes?: string }): Promise<Report> => {
  const body = { sampleId: id, notes };
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/reports/preview`, body);
  return res.data;
}