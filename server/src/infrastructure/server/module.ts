import { SampleService } from "src/domain/service/sample.service"
import { VariantService } from "src/domain/service/variant.service"

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string
      DATABASE_URL: string
      PINO_LOG_LEVEL: string
      NODE_ENV: string
    },
    sampleService: SampleService,
    variantService: VariantService,
  }
}