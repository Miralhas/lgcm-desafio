import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { VariantId } from "src/api/schemas/variant.schema";

const routes: FastifyPluginAsyncTypebox = async (app) => {
  app.get("/:id", {
    schema: { params: VariantId }
  }, async (req, reply) => {
    const id = req.params.id;
    const res = await app.variantService.findByIdOrException(id);
    reply.send(res);
  });

  app.get("/", async (req, reply) => {
    const res = await app.variantService.findAll();
    reply.send(res)
  });

}

export default routes;