import { Button } from "@/components/ui/button";

const ReportTab = () => {
  
  return (
    <div className="grid grid-rows-2 w-full gap-2">
      <p className="text-center text-foreground/90">This Sample has no saved reports.</p>
      <Button variant="modern-secondary">Preview Report</Button>
      <Button variant="modern">Save Report</Button>
    </div>
  )
  
}

export default ReportTab;
