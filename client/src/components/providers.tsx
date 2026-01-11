import { SampleProvider } from "@/contexts/sample-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 5,
    },
  },
});

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SampleProvider>
        {children}
      </SampleProvider>
    </QueryClientProvider>
  )
}

export default Providers;
