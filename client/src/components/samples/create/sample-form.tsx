import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSampleContext } from "@/contexts/sample-context"
import { sampleSchema, type SampleInput, type VariantInput } from "@/lib/schemas/sample-schema"
import { useCreateSample } from "@/services/samples/mutation/use-create-sample"
import { classifications } from "@/types/variant"
import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from "axios"
import { PlusIcon, XIcon } from "lucide-react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"

const defaultVariant: VariantInput = {
  id: "",
  gene: "",
  classification: "vus",
}

const SampleForm = () => {
  const mutation = useCreateSample();
  const { onSelectSample } = useSampleContext()

  const form = useForm<SampleInput>({
    resolver: zodResolver(sampleSchema),
    defaultValues: {
      name: "",
      variants: [defaultVariant]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  })

  const handleSubmit = (data: SampleInput) => {
    mutation.mutate(data, {
      onSuccess: (sample) => {
        toast.success("Sample created successfully!", { position: "top-center" });
        form.reset();
        onSelectSample(sample);

      },
      onError: (err) => {
        let description = err.message;
        if (isAxiosError(err)) {
          description = err.response?.data.message
        }
        toast.error("Failed to create sample!", { description, position: "top-center" })
      }
    })
  }

  return (
    <div className="w-full max-w-[500px] mx-auto border border-zinc-50/20 bg-secondary min-h-50 rounded-lg p-3 space-y-2">
      <div className="space-y-1.5 border-b-4 pb-3">
        <h2 className="font-semibold text-foreground/80">Create Sample</h2>
        <p className="text-muted-foreground text-sm">Create a sample with one or multiple variants</p>
      </div>

      <form className="mt-3 space-y-1" onSubmit={form.handleSubmit(handleSubmit)}>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className={"text-foreground/80"}>Name</Label>
              <Input
                {...field}
                id={field.name}
                className="h-8"
                aria-invalid={fieldState.invalid}
                placeholder="Sample name..."
                autoFocus={false}
              />
              {fieldState.error && <p className="text-sm text-red-800 tracking-tight leading-4">{fieldState.error.message}</p>}
            </div>
          )}
        />

        {fields.map((field, index) => (
          <div className="grid grid-cols-3 gap-1 mt-2" key={field.id}>
            <div className="col-span-full flex justify-between items-center">
              <p className="text-sm ">Variant {index + 1}</p>
              {fields.length > 1 && (
                <Button variant="ghost" size="icon-sm" onClick={() => remove(index)}>
                  <XIcon className="text-foreground/90" />
                </Button>
              )}
            </div>
            <Controller
              key={`${field.id}-${index}-id`}
              name={`variants.${index}.id`}
              control={form.control}
              render={({ field: controllerField, fieldState }) => (
                <Input
                  {...controllerField}
                  id={`variants-array-${index}-id`}
                  aria-invalid={fieldState.invalid}
                  className="h-8 placeholder:text-sm placeholder:text-[13px]"
                  placeholder="ID"
                />
              )}
            />
            <Controller
              key={`${field.id}-${index}-gene`}
              name={`variants.${index}.gene`}
              control={form.control}
              render={({ field: controllerField, fieldState }) => (
                <Input
                  {...controllerField}
                  id={`variants-array-${index}-gene`}
                  aria-invalid={fieldState.invalid}
                  className="h-8 placeholder:text-sm placeholder:text-[13px]"
                  placeholder="Gene"
                />
              )}
            />
            <Controller
              key={`${field.id}-${index}-classification`}
              name={`variants.${index}.classification`}
              control={form.control}
              render={({ field: controllerField, fieldState }) => (
                <Select
                  name={`variants.${index}.classification-select-${controllerField.name}`}
                  value={controllerField.value}
                  aria-invalid={fieldState.invalid}
                  onValueChange={controllerField.onChange}
                >
                  <SelectTrigger
                    id={`variants-array-${index}-classification`}
                    aria-invalid={fieldState.invalid}
                    className="w-full h-8 max-h-8 capitalize text-sm text-[13px] text-foreground/90"
                  >
                    <SelectValue placeholder="Select" className="capitalize" />
                  </SelectTrigger>
                  <SelectContent className="w-full" position="popper">
                    {classifications.map((classification) => (
                      <SelectItem key={classification} value={classification} className="capitalize">
                        {classification}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        ))}
        <Button className="w-full mt-3" variant="modern-secondary" size="sm" type="button" onClick={() => append(defaultVariant)}>
          Add Variant
          <PlusIcon />
        </Button>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button variant="modern" type="submit">Create</Button>
          <Button variant="modern-secondary" type="button" onClick={() => form.reset()}>Reset</Button>
        </div>
      </form>
    </div>
  )
}

export default SampleForm;
