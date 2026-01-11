import SampleReport from "@/components/reports/sample-report";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import type { Report } from "@/types/report";
import { Loader2 } from "lucide-react";
import { useEffect, type Dispatch, type SetStateAction } from "react";

type Props = {
  open: boolean;
  handleOpen: Dispatch<SetStateAction<boolean>>;
  mutate: () => void;
  data: Report | undefined;
}

const PreviewModal = ({ data, open, handleOpen, mutate }: Props) => {

  useEffect(() => {
    mutate();
  }, [])

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-h-120 overflow-y-auto justify-start items-start flex flex-col">
        <DialogHeader className="shrink">
          <DialogTitle>Sample Report Preview</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm tracking-tight wrap-break-words hyphens-auto">
            Report preview for the sample with ID {data?.sampleId}
          </DialogDescription>
        </DialogHeader>
        <div className="border-2 w-full" />
        {data ? (
          <SampleReport data={data} />
        ) : (
          <div className="min-h-60 w-full flex justify-center items-center animate-pulse flex-col gap-1.5">
            <Loader2 className="size-7 animate-spin" />
            <p>Generating preview...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default PreviewModal;
