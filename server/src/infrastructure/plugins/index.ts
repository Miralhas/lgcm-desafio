import fp from 'fastify-plugin';
import { ISampleRepository } from 'src/domain/repository/sample.repository';
import { SampleService } from 'src/domain/service/sample.service';
import { SampleDAO } from '../dao/sample.dao';
import { db } from '../db';
import { IVariantRepository } from 'src/domain/repository/variant.repository';
import { VariantDAO } from '../dao/variant.dao';
import { VariantService } from 'src/domain/service/variant.service';

export default fp(async (fastify) => {
  const sampleRepository: ISampleRepository = new SampleDAO(db);
  const sampleService = new SampleService(sampleRepository);

  const variantRepository: IVariantRepository = new VariantDAO(db);
  const variantService = new VariantService(variantRepository);

  
  fastify.decorate('sampleService', sampleService);
  fastify.decorate('variantService', variantService);
});