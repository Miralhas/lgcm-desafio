import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useGetSamples } from "@/services/samples/query/use-get-samples";
import type { Sample } from "@/types/sample";
import { useState } from "react";
import SampleRow from "./sample-row";

const SamplesTable = () => {
  const [selected, setSelected] = useState<Sample["id"] | undefined>(undefined);
  const query = useGetSamples();

  const handleSelected = (id: Sample["id"]) => {
    if (selected === id) {
      return setSelected(undefined);
    }
    setSelected(id);
  }

  if (query.error) {
    return <h1>Error...</h1>
  }

  return (
    <div className="space-y-1">
      <h2>Available Samples</h2>
      <div className="max-w-150 bg-secondary p-4 border rounded-lg md:min-h-150 flex flex-col space-y-2">
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
              <SampleRow sample={s} key={s.id} handleSelected={handleSelected} selected={selected === s.id} />
            ))}
          </TableBody>
        </Table>
        <p className="mt-auto text-center text-muted-foreground text-sm">A list of all samples</p>
      </div>
    </div>
  )
}



export default SamplesTable;
