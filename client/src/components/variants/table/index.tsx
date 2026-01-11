import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type { Variant } from "@/types/variant";

type Props = {
  variants: Variant[];
}

const VariantsTable = ({ variants }: Props) => {
  return (
    <Table className="mt-2 border">
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Gene</TableHead>
          <TableHead>Classification</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {variants.map(v => (
          <TableRow key={v.id}>
            <TableCell>{v.id}</TableCell>
            <TableCell>{v.gene}</TableCell>
            <TableCell className="capitalize">{v.classification}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default VariantsTable;
