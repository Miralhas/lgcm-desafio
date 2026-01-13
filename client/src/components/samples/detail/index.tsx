import { useSampleContext } from "@/contexts/sample-context";
import { cn } from "@/lib/utils";
import { type PropsWithChildren } from "react";
import NoSample from "../no-sample";
import Tab from "./tabs";

const SampleDetail = () => {
  const { sample } = useSampleContext();

  if (!sample) {
    return (
      <Container className="flex items-center justify-center p-6">
        <NoSample text="No sample selected..." />
      </Container>
    )
  }

  return (
    <Container className="p-4 space-y-2.5">
      <Tab />
    </Container>
  )
}

const Container = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return (
    <>
      <h2 className="text-foreground/70 md:text-right row-start-1 col-start-2">Sample Detail</h2>
      <div className={cn("bg-secondary border rounded-lg", className)}>
        {children}
      </div>
    </>
  )
}

export default SampleDetail;
