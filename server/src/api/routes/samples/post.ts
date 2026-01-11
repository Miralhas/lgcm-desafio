import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { CreateSampleSchema } from "src/api/schemas/sample.schema";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.post("/", {
    schema: { body: CreateSampleSchema }
  }, async (req, reply) => {
    const service = app.sampleService;
    const sample = await service.create(req.body);
    reply.status(201).send(sample);
  })
}

export default route;