import VariantsTable from "@/components/variants/table";
import type { Sample } from "@/types/sample";

const DetailTab = ({ sample }: { sample: Sample }) => {
  return (
    <>
      <p className="text-muted-foreground text-center text-sm">{sample.id}</p>
      <p><span className="text-muted-foreground text-sm">Name: </span><span className="capitalize underline underline-offset-2">{sample.name}</span></p>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Variants: <span className="font-light text-xs">({sample.variants.length})</span></p>
        <VariantsTable variants={sample.variants} />
      </div>
    </>
  )
}

export default DetailTab;
