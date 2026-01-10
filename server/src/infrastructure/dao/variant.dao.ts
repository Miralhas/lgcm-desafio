import { CreateVariantInput, Variant } from "src/api/schemas/variant.schema";
import { IVariantRepository } from 'src/domain/repository/variant.repository';
import { DB } from '../db';
import { variants } from "../db/schemas";
import { Sample } from "src/api/schemas/sample.schema";

export class VariantDAO implements IVariantRepository {

  constructor(private readonly db: DB) { }

  async create(input: CreateVariantInput, sampleId: Sample["id"]): Promise<Variant | undefined> {
    const res = await this.db.insert(variants)
      .values({ ...input, sampleId })
      .returning();
    return res[0];
  }

  async findAll(): Promise<Variant[]> {
    return await this.db.query.variants.findMany();
  }

  async findById(id: Variant['id']): Promise<Variant | undefined> {
    return await this.db.query.variants.findFirst({ where: { id } });
  }
}