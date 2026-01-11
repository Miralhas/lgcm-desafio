import Container from "@/components/container";
import SamplesTable from "@/components/samples/samples-table";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <Container className="p-6 space-y-12 font-roboto">
      <h1 className="font-tilt text-center text-2xl uppercase tracking-widest bg-linear-to-r from-red-500 to-primary/10 bg-clip-text text-transparent font-bold">LGMC - Samples</h1>
      <Suspense fallback={<h1>Loading...</h1>}>
        <SamplesTable />
      </Suspense>
    </Container>
  )
}

export default HomePage;
