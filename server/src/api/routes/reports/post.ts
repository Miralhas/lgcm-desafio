import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { InputSchema } from "src/api/schemas/report.schema.js";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.post("/preview", { schema: { body: InputSchema } }, async (req, reply) => {
    const service = app.reportService;
    const preview = await service.generatePreview(req.body.sampleId, req.body.notes);
    reply.status(201).send(preview);
  });

  app.post("/", { schema: { body: InputSchema } }, async (req, reply) => {
    const service = app.reportService;
    const preview = await service.create(req.body);
    reply.status(201).send(preview);
  });
}

export default route;