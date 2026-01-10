import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { VariantId } from "src/api/schemas/variant.schema";

const routes: FastifyPluginAsyncTypebox = async (app) => {
  app.get("/:id", {
    schema: { params: VariantId }
  }, async (req, reply) => {
    const id = req.params.id;
    return app.variantService.findByIdOrException(id);
  });

  app.get("/", async (req, reply) => {
    return app.variantService.findAll();
  });

}

export default routes;