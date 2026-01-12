import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useGetSamples } from "@/services/samples/query/use-get-samples";
import { FlaskConicalOffIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import SampleRow from "./sample-row";

const SamplesTable = () => {
  const query = useGetSamples();

  if (query.error) {
    return <h1>Error...</h1>
  }

  const isEmpty = query.data.length <= 0;

  if (isEmpty) {
    return (
      <Wrapper className="items-center justify-center">
        <div className="p-12 bg-card/80 text-muted-foreground border border-zinc-50/15 rounded-lg space-y-3">
          <FlaskConicalOffIcon className="size-7 mx-auto" />
          <p className="text-center">No samples saved yet.</p>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="">Id</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Number of Variants</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data.map(s => (
            <SampleRow sample={s} key={s.id} />
          ))}
        </TableBody>
      </Table>
      <p className="mt-auto text-center text-muted-foreground text-sm">A list of all samples</p>
    </Wrapper>
  )
}

const Wrapper = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className="space-y-1">
      <h2 className="text-foreground/70">Available Samples</h2>
      <div className={cn("max-w-150 bg-secondary p-4 border rounded-lg md:min-h-100 flex flex-col space-y-2", className)}>
        {children}
      </div>
    </div>
  )
}



export default SamplesTable;
