import { VariantMapper } from "src/api/mappers/variant.mapper";
import { Sample } from "src/api/schemas/sample.schema";
import { CreateVariantInput, Variant, VariantDTO } from "src/api/schemas/variant.schema";
import { NotFoundException } from "../exceptions/not-found";
import { IVariantRepository } from "../repository/variant.repository";

export class VariantService {
  constructor(protected readonly variantRepository: IVariantRepository) { }

  async findAll(): Promise<Variant[]> {
    return await this.variantRepository.findAll();
  }

  async findByIdOrException(id: Variant["id"]): Promise<VariantDTO> {
    const sample = await this.variantRepository.findById(id);
    this.handleNotFound(sample, id);
    return VariantMapper.toResponse(sample);
  }

  async create(input: CreateVariantInput, sampleId: Sample["id"]): Promise<Variant | undefined> {
    return await this.variantRepository.create(input, sampleId);
  }

  private handleNotFound(variant: Variant | undefined, id: Variant['id']): asserts variant is Variant {
    if (!variant) throw new NotFoundException(`Variant with id ${id} not found`);
  }

}