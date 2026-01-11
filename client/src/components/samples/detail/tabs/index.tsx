import { cn } from "@/lib/utils";
import { useState } from "react";
import DetailTab from "./detail-tab";
import { useSampleContext } from "@/contexts/sample-context";
import ReportTab from "./report-tab";

const TABS = ["detail", "report"] as const;
export type Tab = typeof TABS[number];

const classname = "cursor-pointer p-1 w-[150px] flex justify-center text-muted-foreground border border-zinc-50/30 rounded-lg capitalize"
const selectedClass = "bg-primary/10 border-primary/30 text-white"

const Tab = () => {
  const { sample } = useSampleContext()
  const [tab, setTab] = useState<Tab>("detail");

  const handleTab = (t: Tab) => {
    setTab(t);
  }

  return (
    <>
      <div className="w-full rounded-lg bg-card px-4 py-1 flex items-center justify-center gap-4 text-sm">
        {TABS.map(t => {
          const isSelected = tab === t;
          return <div className={cn(classname, isSelected && selectedClass)} onClick={() => handleTab(t)}>{t}</div>
        })}
      </div>

      <div className="border-2 my-3 w-full" />

      {tab === "report" && <ReportTab />}
      {tab === "detail" && <DetailTab sample={sample!} />}
    </>
  )
}

export default Tab;
