import { FastifyInstance } from "fastify";
import { BaseException } from "src/domain/exceptions/base-exception";
import { NotFoundException } from "src/domain/exceptions/not-found";

export const errorHandler: FastifyInstance['errorHandler'] = function (error, request, reply) {
  if (error instanceof BaseException) {
    if (error instanceof NotFoundException && request.method === "DELETE") {
      return reply.code(204).send();
    }
    return reply.status(error.statusCode).send(error.message);
  }

  reply.log.error({
    request: {
      method: request.method,
      url: request.url,
      headers: request.headers,
      body: request.body,
      query: request.query,
      params: request.params
    },
    error
  }, 'Unhandled error occurred.');
  return reply
    .code(500)
    .send(error);
};