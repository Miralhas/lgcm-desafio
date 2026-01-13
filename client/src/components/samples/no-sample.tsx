import { FlaskConicalOffIcon } from "lucide-react";

const NoSample = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center p-6 md:p-12 rounded-md bg-card/60 text-muted-foreground flex-col gap-2 border">
      <FlaskConicalOffIcon className="size-6 md:size-7" />
      <p className="text-sm md:text-base">{text}</p>
    </div>
  )
}

export default NoSample;
