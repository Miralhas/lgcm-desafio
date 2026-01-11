import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useCreateReport } from "@/services/reports/mutation/use-create-report";
import type { Report } from "@/types/report";
import type { Sample } from "@/types/sample";
import { useState } from "react";
import { toast } from "sonner";

const CreateReportModal = ({ id }: { id: Sample["id"] }) => {
  const [open, setOpen] = useState(false);
  const mutation = useCreateReport();
  const [notes, setNotes] = useState<Report["notes"] | undefined>(undefined);

  const handleMutation = () => {
    mutation.mutate({ id, notes }, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Report has been created successfully.", { position: "top-center" })
      }
    });
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="modern">Create Sample Report</Button>
      </DialogTrigger>
      <DialogContent className="max-h-120 overflow-y-auto justify-start items-start flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Sample Report</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm tracking-tight wrap-break-words hyphens-auto">
            Create report for sample with ID {id}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full space-y-1">
          <label htmlFor="notes" className="inline-block text-sm font-medium text-muted-foreground">Report notes <span className="font-light text-xs">(optional)</span>:</label>
          <textarea
            onChange={(e) => setNotes(e.currentTarget.value)}
            value={notes}
            className="border border-zinc-50/20 w-full pl-2 pt-1 placeholder:text-sm focus:outline-none! focus:ring focus:ring-primary/30 rounded-md"
            name="notes"
            id="notes"
            placeholder="Type here..."
          >
          </textarea>
        </div>
        <div className="space-x-3">
          <Button variant="modern" onClick={handleMutation}>Create Report</Button>
          <DialogClose asChild>
            <Button variant="modern-secondary">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateReportModal;
