import autoLoad from "@fastify/autoload";
import env from '@fastify/env';
import * as dotenv from "dotenv";
import Fastify from 'fastify';
import { dirname, join } from 'node:path';
import { errorHandler } from "src/api/error-handler/index.js";
import { createLogger, Level } from 'src/utils/logger.js';
import { options } from './schema.js';
import { fileURLToPath } from "node:url";
import cors from "@fastify/cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const level = process.env.PINO_LOG_LEVEL as Level;
const isDev = process.env.NODE_ENV === 'development';
const logger = createLogger({ level, isDev });

export { logger };

export const createServer = async () => {
  const app = Fastify({
    loggerInstance: logger,
  });

  await app.register(cors, {
    origin: "*",
  })

  await app.register(env, options).after();

  await app.register(autoLoad, {
    dir: join(__dirname, "../../api/routes"),
    options: { prefix: "/api" },
    forceESM: true,
  });

  app.register(autoLoad, {
    dir: join(__dirname, '../plugins'),
    forceESM: true,
  });

  app.setErrorHandler(errorHandler);

  app.ready(() => {
    app.log.info(app.printRoutes());
  })

  return app;
}