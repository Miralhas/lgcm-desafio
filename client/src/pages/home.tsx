import Container from "@/components/container";
import SampleForm from "@/components/samples/create/sample-form";
import SampleDetail from "@/components/samples/detail";
import SamplesTable from "@/components/samples/table";

const HomePage = () => {
  return (
    <Container className="p-6 space-y-1 font-roboto relative overflow-hidden md:overflow-visible">
      <h1 className="font-tilt text-center text-2xl uppercase tracking-widest bg-linear-to-r from-red-500 via-primary/40 to-primary/10 bg-clip-text text-transparent font-bold mb-6">
        LGCM - Samples</h1>
      <SampleForm />
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 grid-rows-[min-content_400px] gap-y-1 gap-x-4 p-3 relative z-50">
        <SamplesTable />
        <SampleDetail />
      </div>
    </Container>
  )
}

export default HomePage;
