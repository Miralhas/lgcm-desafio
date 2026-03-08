import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { SampleMapper } from "src/api/mappers/sample.mapper.js";
import { SampleId, UpdateSampleSchema } from "src/api/schemas/sample.schema.js";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.put("/:id", {
      schema: { params: SampleId, body: UpdateSampleSchema }
    }, async (req, reply) => {
    const service = app.sampleService;
    const id = req.params.id;
    
    const sample = await service.update(id, req.body);

    reply.status(200).send(SampleMapper.toResponse(sample!));
  })
}

export default route;