import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { SampleId } from "src/api/schemas/sample.schema";
import { CreateVariantSchema } from "src/api/schemas/variant.schema";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.post("/:id", {
    schema: {
      body: CreateVariantSchema,
      params: SampleId
    }
  }, async (req, reply) => {
    const sampleId = req.params.id
    const service = app.variantService;

    const sample = await service.create(req.body, sampleId);
    reply.status(201).send(sample);
  })
}

export default route;