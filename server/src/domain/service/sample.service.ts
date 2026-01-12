import { SampleMapper } from "src/api/mappers/sample.mapper.js";
import { CreateSampleInput, Sample, SampleDTO } from "src/api/schemas/sample.schema.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ISampleRepository } from "../repository/sample.repository.js";
import { VariantService } from "./variant.service.js";
import { isUniqueConstraintError } from "src/utils/map-error.js";
import { VariantAlreadyExists } from "../exceptions/variant-already-exists.js";

export class SampleService {
  constructor(
    protected readonly sampleRepository: ISampleRepository,
    protected readonly variantService: VariantService
  ) { }

  async findAll(): Promise<Sample[]> {
    return await this.sampleRepository.findAll();
  }

  async findByIdOrException(id: Sample["id"]): Promise<SampleDTO> {
    const sample = await this.sampleRepository.findById(id);
    this.handleNotFound(sample, id);
    return SampleMapper.toResponse(sample);
  }

  async create(input: CreateSampleInput): Promise<Sample | undefined> {
    try {
      const sample = SampleMapper.toDomain(input);
      return await this.sampleRepository.create(sample);
    } catch (err: any) {
      if (isUniqueConstraintError(err) && err.cause.table === "variants") {
        const sampleId = err.cause.detail.split("=")[1].split(" ")[0]; // sample's id
        throw new VariantAlreadyExists(sampleId);
      }
      throw err;
    }
  }

  private handleNotFound(sample: Sample | undefined, id: Sample['id']): asserts sample is Sample {
    if (!sample) throw new NotFoundException(`Sample with id ${id} not found`);
  }

}