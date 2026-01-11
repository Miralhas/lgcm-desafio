import type { Sample } from "@/types/sample";
import axios from "axios";

export const getSamples = async (): Promise<Sample[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/samples`);
  return response.data;
}