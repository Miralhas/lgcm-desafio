import fp from 'fastify-plugin';
import { ISampleRepository } from 'src/domain/repository/sample.repository';
import { SampleService } from 'src/domain/service/sample.service';
import { SampleDAO } from '../dao/sample.dao';
import { db } from '../db';
import { IVariantRepository } from 'src/domain/repository/variant.repository';
import { VariantDAO } from '../dao/variant.dao';
import { VariantService } from 'src/domain/service/variant.service';
import { ReportService } from 'src/domain/service/report.service';
import { ReportDAO } from '../dao/report.dao';
import { IReportRepository } from 'src/domain/repository/reports.repository';

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