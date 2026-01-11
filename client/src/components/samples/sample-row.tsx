import type { Sample } from "@/types/sample";
import { TableCell, TableRow } from "../ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
  sample: Sample;
  selected: boolean;
  handleSelected: (id: Sample["id"]) => void;
}

const SampleRow = ({ sample, selected, handleSelected }: Props) => {
  const { id, name, variants } = sample;

  return (
    <TableRow data-state={selected && "selected"} onClick={() => handleSelected(id)} className="cursor-pointer">
      <Tooltip delayDuration={400}>
        <TooltipTrigger asChild>
          <TableCell className="font-medium max-w-25 truncate">{id}</TableCell>
        </TooltipTrigger>
        <TooltipContent>
          <p>{id}</p>
        </TooltipContent>
      </Tooltip>
      <TableCell className="text-center">{name}</TableCell>
      <TableCell className="text-center">{variants.length}</TableCell>
    </TableRow>
  )
}

export default SampleRow;
