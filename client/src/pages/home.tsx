import Container from "@/components/container";
import SamplesSkeleton from "@/components/samples-skeleton";
import SampleForm from "@/components/samples/create/sample-form";
import SampleDetail from "@/components/samples/detail";
import SamplesTable from "@/components/samples/table";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <Container className="p-6 space-y-1 font-roboto relative overflow-hidden">
      <h1 className="font-tilt text-center text-2xl uppercase tracking-widest bg-linear-to-r from-red-500 to-primary/10 bg-clip-text text-transparent font-bold mb-6">
        LGMC - Samples</h1>
      <SampleForm />
      <div className="md:grid md:grid-cols-2 gap-4 p-3 relative z-50">
        <Suspense fallback={<SamplesSkeleton />}>
          <SamplesTable />
        </Suspense>
        <SampleDetail />
      </div>
    </Container>
  )
}

export default HomePage;
