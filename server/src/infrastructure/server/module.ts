import { ReportService } from "src/domain/service/report.service.js"
import { SampleService } from "src/domain/service/sample.service.js"
import { VariantService } from "src/domain/service/variant.service.js"

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
    reportService: ReportService
  }
}