import { SampleService } from "src/domain/service/variants.service"

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string
      DATABASE_URL: string
      PINO_LOG_LEVEL: string
      NODE_ENV: string
    },
    sampleService: SampleService
  }
}