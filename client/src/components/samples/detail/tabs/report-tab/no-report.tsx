import { Button } from "@/components/ui/button";
import { useReportPreview } from "@/services/reports/mutation/use-report-preview";
import type { Report } from "@/types/report";
import type { Sample } from "@/types/sample";
import { useState } from "react";
import PreviewModal from "./preview-modal";
import CreateReportModal from "./create-report-modal";

const NoReport = ({ id }: { id: Sample["id"] }) => {
  const mutation = useReportPreview();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<Report | undefined>(undefined);

  const handleOpen = () => setOpenModal(prev => !prev);

  const mutate = () => {
    if (data) return;
    mutation.mutate({ id }, { onSuccess: (d) => setData(d) })
  }

  return (
    <div className="grid grid-rows-2 w-full gap-2">
      <p className="text-center text-foreground/80">This Sample has no saved reports.</p>
      {openModal && <PreviewModal data={data} open={openModal} handleOpen={setOpenModal} mutate={mutate} />}
      <Button variant="modern-secondary" onClick={handleOpen}>Generate Report Preview</Button>
      <CreateReportModal id={id}/>
    </div>
  )
}

export default NoReport;
