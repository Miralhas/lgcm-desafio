import { queryOptions, useQuery } from "@tanstack/react-query";
import { getSamples } from "../api/get-samples";
import { sampleKeys } from "./query-keys";

const getSamplesQueryOptions = () => queryOptions({
  queryFn: getSamples,
  queryKey: sampleKeys.getSamples(),
});

export const useGetSamples = () => useQuery(getSamplesQueryOptions());