import { cn } from "@/lib/utils";
import { type PropsWithChildren } from "react";

const Container = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("mx-auto w-full max-w-[1024px]", className)}>
      {children}
    </div>
  )
}

export default Container;