import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { SampleId } from "src/api/schemas/sample.schema";

const routes: FastifyPluginAsyncTypebox = async (app) => {
  app.get("/:id", {
    schema: { params: SampleId }
  }, async (req, reply) => {
    const id = req.params.id;
    const service = app.sampleService;
    return service.findByIdOrException(id);
  });

  app.get("/", async (req, reply) => {
    const service = app.sampleService;
    return service.findAll();
  });
}

export default routes;