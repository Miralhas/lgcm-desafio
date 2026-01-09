import autoLoad from "@fastify/autoload";
import env from '@fastify/env';
import * as dotenv from "dotenv";
import Fastify from 'fastify';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLogger, Level } from 'src/utils/logger';
import { options } from './schema';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const level = process.env.PINO_LOG_LEVEL as Level;
const isDev = process.env.NODE_ENV === 'development';
const logger = createLogger({ level, isDev });

export { logger };

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string
      DATABASE_URL: string
      PINO_LOG_LEVEL: string
      NODE_ENV: string
    }
  }
}

export const createServer = async () => {
  const fastify = Fastify({
    loggerInstance: logger,
  });

  await fastify.register(env, options).after();

  await fastify.register(autoLoad, {
    dir: join(__dirname, "../../api/routes"),
    options: { prefix: "/api" },
    forceESM: true,
  });

  fastify.ready(() => {
    fastify.log.info(fastify.printRoutes());
  })

  return fastify;
}
