import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { SampleMapper } from "src/api/mappers/sample.mapper.js";
import { CreateSampleSchema } from "src/api/schemas/sample.schema.js";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.post("/", {
    schema: { body: CreateSampleSchema }
  }, async (req, reply) => {
    const service = app.sampleService;
    const sample = await service.create(req.body);
    reply.status(201).send(SampleMapper.toResponse(sample!));
  })
}

export default route;