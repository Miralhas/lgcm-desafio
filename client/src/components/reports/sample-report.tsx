import { formatFullDateBR } from "@/lib/utils";
import type { Report } from "@/types/report";
import PdfModal from "../pdf/pdf-modal";
import VariantsTable from "../variants/table";

type Props = {
  data: Report;
  showDownloadPDF?: boolean;
}

const SampleReport = ({ data, showDownloadPDF = false }: Props) => {
  return (
    <div className="space-y-3 w-full">
      {showDownloadPDF && (
        <div className="flex justify-center mb-4">
          <PdfModal report={data} />
        </div>
      )}
      <p className="text-center capitalize">{formatFullDateBR(data.generatedAt)}</p>
      <div className="bg-card border-x-4 text-center rounded-sm border-zinc-50/40 p-2 text-foreground/80 text-sm mb-3">
        <p>{data.summary}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(data.statistics).map(([key, value]) => (
          <div key={key} className="bg-card flex flex-col px-3 py-2 gap-1 border border-zinc-50/10 rounded-lg capitalize">
            <p className="text-xs md:text-lg font-semibold">{value}</p>
            <p className="text-muted-foreground font-semibold text-xs md:text-base overflow-hidden">{key}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="text-muted-foreground text-xs text-center">Highlighted Variants:</p>
        <VariantsTable variants={data.highlightedVariants} />
      </div>
      <div className="w-full border rounded-md p-3 text-sm bg-card">
        {data.notes}
      </div>
    </div>
  )
}

export default SampleReport;
