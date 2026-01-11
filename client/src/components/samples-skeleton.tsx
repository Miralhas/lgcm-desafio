import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

type Props = {
  headerLength?: number;
  rowsLength?: number
}

const SamplesSkeleton = ({ headerLength = 3, rowsLength = 6 }: Props) => {
  return (
    <>
      <div className="space-y-1">
        <p className="text-foreground/70">Available Samples</p>
        <div className="md:min-h-100 animate-pulse bg-secondary w-full border rounded-lg p-4">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: headerLength }).map((_, index) => (
                  <TableHead key={index}><Skeleton className="h-[37.5px] w-full rounded-none" /></TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: rowsLength }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: headerLength }).map((__, rowIndex) => (
                    <TableCell key={rowIndex}><Skeleton className="h-[37.5px] w-full rounded-none" /></TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* <div className="space-y-1">
        <p className="text-foreground/70">Sample Detail</p>
        <div className="md:min-h-100 animate-pulse bg-secondary w-full border rounded-lg">

        </div>
      </div> */}
    </>
  )
}

export default SamplesSkeleton;
