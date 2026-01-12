import type { SampleInput } from "@/lib/schemas/sample-schema";
import type { Sample } from "@/types/sample";
import axios from "axios";

export const createSample = async (body: SampleInput): Promise<Sample> => {
  const res = await axios.post<Sample>(`${import.meta.env.VITE_API_URL}/api/samples`, body);
  return res.data;
}