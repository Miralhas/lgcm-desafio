import { useMutation } from "@tanstack/react-query";
import { reportPreview } from "../api/report-preview";

export const useReportPreview = () => {
  return useMutation({
    mutationFn: reportPreview
  })
}