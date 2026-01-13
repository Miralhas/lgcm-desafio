import SamplesSkeleton from "@/components/samples-skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useGetSamples } from "@/services/samples/query/use-get-samples";
import type { PropsWithChildren } from "react";
import NoSample from "../no-sample";
import SampleRow from "./sample-row";

const SamplesTable = () => {
  const query = useGetSamples();

  if (query.error) {
    return <h1>Error...</h1>
  }

  if (query.isLoading) {
    return <SamplesSkeleton />
  }

  const isEmpty = query.data && query.data.length <= 0;

  if (isEmpty) {
    return (
      <Wrapper className="flex items-center justify-center p-6">
        <NoSample text="No samples saved yet." />
      </Wrapper>
    )
  }

  return (
    <Wrapper className="flex flex-col space-y-2 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Id</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Number of Variants</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data?.map(s => (
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
    <>
      <h2 className="text-foreground/70 row-start-1 col-span-1">Available Samples</h2>
      <div className={cn("bg-secondary border rounded-lg", className)}>
        {children}
      </div>
    </>
  )
}



export default SamplesTable;
