import { Button } from "@/components/ui/button";
import { useGetReportById } from "@/services/reports/query/use-get-report-by-id";
import type { Sample } from "@/types/sample";
import { isAxiosError } from "axios";

const ReportTab = ({ id }: { id: Sample["id"] }) => {
  const query = useGetReportById(id);

  if (query.isLoading) {
    return <p>loading...</p>
  }

  const is404 = isAxiosError(query.error) && query.error.response?.data.statusCode === 404;

  if (query.isError && !is404) {
    return <p>Error </p>
  }

  return (
    <div className="grid grid-rows-2 w-full gap-2">
      <p className="text-center text-foreground/80">This Sample has no saved reports.</p>
      <Button variant="modern-secondary">Preview Report</Button>
      <Button variant="modern">Save Report</Button>
    </div>
  )

}

export default ReportTab;
