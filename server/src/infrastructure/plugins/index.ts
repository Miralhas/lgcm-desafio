import fp from 'fastify-plugin';
import { ISampleRepository } from 'src/domain/repository/sample.repository.js';
import { SampleService } from 'src/domain/service/sample.service.js';
import { SampleDAO } from '../dao/sample.dao.js';
import { db } from '../db/index.js';
import { IVariantRepository } from 'src/domain/repository/variant.repository.js';
import { VariantDAO } from '../dao/variant.dao.js';
import { VariantService } from 'src/domain/service/variant.service.js';
import { ReportService } from 'src/domain/service/report.service.js';
import { ReportDAO } from '../dao/report.dao.js';
import { IReportRepository } from 'src/domain/repository/reports.repository.js';

export default fp(async (fastify) => {
  const variantRepository: IVariantRepository = new VariantDAO(db);
  const variantService = new VariantService(variantRepository);

  const sampleRepository: ISampleRepository = new SampleDAO(db);
  const sampleService = new SampleService(sampleRepository, variantService);

  const reportRepository: IReportRepository = new ReportDAO(db);
  const reportService = new ReportService(sampleService, reportRepository);


  fastify.decorate('sampleService', sampleService);
  fastify.decorate('variantService', variantService);
  fastify.decorate('reportService', reportService);
});