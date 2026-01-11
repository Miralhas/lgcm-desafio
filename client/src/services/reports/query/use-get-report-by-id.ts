import type { Sample } from "@/types/sample";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getReportById } from "../api/get-report-by-id";
import { reportKeys } from "./query-keys";
import { isAxiosError } from "axios";

const getReportByIdQueryOptions = (id: Sample["id"]) => queryOptions({
  queryFn: () => getReportById(id),
  queryKey: reportKeys.getReportById(id),
  retry: (_, err) => isAxiosError(err) && err.code === "404",
})

export const useGetReportById = (id: Sample["id"]) => useQuery(
  getReportByIdQueryOptions(id)
)