import type { Sample } from "@/types/sample"
import { createContext } from "./create-context";
import { useState, type PropsWithChildren } from "react";

type SampleStates = {
  sample?: Sample;
}

type SampleActions = {
  onSelectSample: (sample: Sample) => void;
}

const { ContextProvider, useContext } = createContext<SampleStates & SampleActions>();

export const SampleProvider = ({ children }: PropsWithChildren) => {
  const [selected, setSelected] = useState<Sample | undefined>(undefined);

  const onSelectSample = (sample: Sample) => {
    if (selected?.id === sample.id) {
      return setSelected(undefined);
    }
    setSelected(sample);
  }

  return (
    <ContextProvider value={{
      onSelectSample,
      sample: selected
    }}>
      {children}
    </ContextProvider>
  )
}

// eslint-disable-next-line
export const useSampleContext = useContext;