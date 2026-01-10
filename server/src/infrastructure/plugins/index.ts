import fp from 'fastify-plugin';
import { ISampleRepository } from 'src/domain/repository/sample.repository';
import { SampleService } from 'src/domain/service/variants.service';
import { SampleDAO } from '../dao/sample.dao';
import { db } from '../db';

export default fp(async (fastify) => {
  const sampleRepository: ISampleRepository = new SampleDAO(db);
  const sampleService = new SampleService(sampleRepository);
  fastify.decorate('sampleService', sampleService);
});