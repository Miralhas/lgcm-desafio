import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "typebox";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.get("/:sampleId", {
    schema: {
      params: Type.Object({ sampleId: Type.String({ format: "uuid" }) })
    }
  }, async (req, reply) => {
    const report = await app.reportService.findByIdOrException(req.params.sampleId);
    reply.send(report);
  })
}
export default route;