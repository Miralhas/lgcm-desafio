import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSample } from "../api/create-sample";
import { sampleKeys } from "../query/query-keys";

export const useCreateSample = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createSample,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: sampleKeys.all });
    }
  })
}