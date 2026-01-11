import type { Report } from "@/types/report";
import type { Sample } from "@/types/sample";
import axios from "axios";

export const getReportById = async (id: Sample["id"]): Promise<Report> => {
  const response = await axios.get<Report>(`${import.meta.env.VITE_API_URL}/api/reports/${id}`);
  return response.data;
}