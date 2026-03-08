import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { SampleId } from "src/api/schemas/sample.schema.js";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.delete("/:id", {
      schema: { params: SampleId }
    }, async (req, reply) => {
    const service = app.sampleService;
    const id = req.params.id;
    
    await service.delete(id);
    
    reply.status(204);
  })
}

export default route;