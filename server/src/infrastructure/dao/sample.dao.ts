import { CreateSampleInput, Sample } from 'src/api/schemas/sample.schema';
import { ISampleRepository } from 'src/domain/repository/sample.repository';
import { DB } from '../db';
import { samples } from '../db/schemas';

export class SampleDAO implements ISampleRepository {

  constructor(private readonly db: DB) {}

  async create(input: CreateSampleInput): Promise<Sample | undefined> {
    const x = await this.db.insert(samples)
      .values(input)
      .returning();
    return x[0]
  }

  async findAll(): Promise<Sample[]> {
    return await this.db.query.samples.findMany();
  }

  async findById(id: Sample['id']): Promise<Sample | undefined> {
    return await this.db.query.samples.findFirst({ where: { id } });
  }
}