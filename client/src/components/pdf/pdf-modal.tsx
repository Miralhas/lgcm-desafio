import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Report } from "@/types/report";
import { PDFViewer } from "@react-pdf/renderer";
import { Button } from "../ui/button";
import ReportPDF from "./report-pdf";
import { FileDownIcon } from "lucide-react";

const PdfModal = ({ report }: { report: Report }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="modern-secondary" size="sm" className="text-sm text-[13px]">
          <FileDownIcon />
          Download PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[1024px]!" >
        <DialogHeader>
          <DialogTitle>Report PDF Viewer</DialogTitle>
          <DialogDescription className="sr-only">
            Visualize and download your report PDF
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <PDFViewer className="w-full h-full min-h-[60vh] p-6">
            <ReportPDF data={report} />
          </PDFViewer>
        </div>
      </DialogContent>
    </Dialog>
  )
}


export default PdfModal;


