import { useSampleContext } from "@/contexts/sample-context";
import { cn } from "@/lib/utils";
import { FlaskConicalOff } from "lucide-react";
import { type PropsWithChildren } from "react";
import Tab from "./tabs";

const SampleDetail = () => {
  const { sample } = useSampleContext();

  if (!sample) {
    return (
      <Container className="flex items-center justify-center">
        <div className="flex items-center justify-center p-12 rounded-md bg-card/60 text-muted-foreground flex-col gap-2 border">
          <FlaskConicalOff className="size-8" />
          <p className="">No sample selected...</p>
        </div>
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
    <div className="flex-1 space-y-1">
      <h2 className="text-foreground/70">Sample Detail</h2>
      <div className={cn("bg-secondary border rounded-lg md:min-h-100", className)}>
        {children}
      </div>
    </div>
  )
}

export default SampleDetail;
