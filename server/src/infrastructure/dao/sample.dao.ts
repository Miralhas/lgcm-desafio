import { Sample } from 'src/api/schemas/sample.schema.js';
import { ISampleRepository } from 'src/domain/repository/sample.repository.js';
import { DB } from '../db/index.js';
import { samples, variants } from '../db/schemas.js';
import { eq } from 'drizzle-orm';

export class SampleDAO implements ISampleRepository {

  constructor(private readonly db: DB) { }

  async create(input: Sample): Promise<Sample | undefined> {
    const savedSample = (await this.db.transaction(async (tx) => {
      const [sample] = await tx
        .insert(samples)
        .values(input)
        .returning();

      const savedVariants = await tx.insert(variants).values(
        input.variants.map(v => ({
          ...v,
          sampleId: sample!.id
        }))
      ).returning();
      return {...sample, variants: savedVariants};
    }));

    return savedSample as Sample;
  }

  async update(id: Sample["id"], sample: Sample): Promise<Sample | undefined> {
    const [res] = await this.db.update(samples).set(sample).where(eq(samples.id, id)).returning();
    if (res) return await this.findById(res.id);
  }

  async findAll(): Promise<Sample[]> {
    return await this.db.query.samples.findMany({ with: { variants: true } });
  }

  async findById(id: Sample['id']): Promise<Sample | undefined> {
    return await this.db.query.samples.findFirst({ where: { id }, with: { variants: true } });
  }

  async delete(id: Sample['id']): Promise<void> {
    await this.db.delete(samples).where(eq(samples.id, id));
  }
}