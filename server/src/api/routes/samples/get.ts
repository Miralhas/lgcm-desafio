import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { SampleMapper } from "src/api/mappers/sample.mapper.js";
import { SampleId } from "src/api/schemas/sample.schema.js";

const routes: FastifyPluginAsyncTypebox = async (app) => {
  app.get("/:id", {
    schema: { params: SampleId }
  }, async (req, reply) => {
    const id = req.params.id;
    const res = await app.sampleService.findByIdOrException(id);
    reply.send(res);
  });

  app.get("/", async (req, reply) => {
    const res = await app.sampleService.findAll();
    reply.send(res.map(s => SampleMapper.toResponse(s)));
  });

}

export default routes;