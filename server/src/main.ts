import { createServer } from 'src/infrastructure/server/index.js';


const main = async () => {
  const fastify = await createServer();
  const port = Number(fastify.config.PORT);

  try {
    fastify.listen({ port, host: '0.0.0.0' }, () => {
      fastify.log.info(`Listening on ${port}...`);
    })
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

main();