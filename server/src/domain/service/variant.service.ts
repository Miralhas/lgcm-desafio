import { VariantMapper } from "src/api/mappers/variant.mapper.js";
import { Sample } from "src/api/schemas/sample.schema.js";
import { CreateVariantInput, Variant, VariantDTO } from "src/api/schemas/variant.schema.js";
import { isUniqueConstraintError } from "src/utils/map-error.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { VariantAlreadyExists } from "../exceptions/variant-already-exists.js";
import { IVariantRepository } from "../repository/variant.repository.js";

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
    try {
      const variant = await this.variantRepository.create(input, sampleId);
      return variant;
    } catch (err) {
      if (isUniqueConstraintError(err)) {
        throw new VariantAlreadyExists(input.id);
      }
      throw err;
    }
  }

  private handleNotFound(variant: Variant | undefined, id: Variant['id']): asserts variant is Variant {
    if (!variant) throw new NotFoundException(`Variant with id ${id} not found`);
  }

}