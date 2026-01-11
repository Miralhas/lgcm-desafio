import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReport } from "../api/post-report";
import { reportKeys } from "../query/query-keys";

export const useCreateReport = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: postReport,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: reportKeys.all });
    }
  })
}