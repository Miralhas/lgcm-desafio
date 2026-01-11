import type { Sample } from "@/types/sample";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useSampleContext } from "@/contexts/sample-context";

type Props = {
  sample: Sample;
}

const SampleRow = ({ sample }: Props) => {
  const { id, name, variants } = sample;
  const { onSelectSample, sample: selected } = useSampleContext();

  const isSelected = sample.id === selected?.id;

  return (
    <TableRow
      data-state={isSelected && "selected"}
      onClick={() => onSelectSample(sample)}
      className="cursor-pointer hover:bg-primary/10 hover:border hover:border-primary/30"
    >
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
