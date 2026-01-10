import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { CreateReportSchema } from "src/api/schemas/report.schema";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.post("/preview", { schema: { body: CreateReportSchema } }, async (req, reply) => {
    const service = app.reportService;
    const preview = await service.generatePreview(req.body.sampleId, req.body.notes);
    reply.send(preview);
  })
}

export default route;