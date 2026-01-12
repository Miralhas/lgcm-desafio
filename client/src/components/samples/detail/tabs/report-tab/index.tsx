import SampleReport from "@/components/reports/sample-report";
import { useGetReportById } from "@/services/reports/query/use-get-report-by-id";
import type { Sample } from "@/types/sample";
import { isAxiosError } from "axios";
import { FlaskConical } from "lucide-react";
import NoReport from "./no-report";

const ReportTab = ({ id }: { id: Sample["id"] }) => {
  const query = useGetReportById(id);
  const is404 = !query.isLoading && isAxiosError(query.error) && query.error.response?.data.statusCode === 404;
  const isError = query.isError && !is404;

  if (query.isLoading) {
    return (
      <div className="min-h-60 text-center text-muted-foreground flex flex-col gap-1 items-center justify-center animate-pulse">
        <FlaskConical className="size-7" />
        <p className="text-sm">Loading Report...</p>
      </div>
    )
  }

  if (isError) {
    return <p>Error</p>
  }

  if (is404) {
    return <NoReport id={id} />
  }

  return (
    <div className="max-h-[300px] overflow-y-auto p-3 pt-1">
      <SampleReport data={query.data!} />
    </div>
  )

}

export default ReportTab;
