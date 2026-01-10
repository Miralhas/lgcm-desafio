import { SampleMapper } from "src/api/mappers/sample.mapper";
import { CreateSampleInput, Sample, SampleDTO } from "src/api/schemas/sample.schema";
import { NotFoundException } from "../exceptions/not-found";
import { ISampleRepository } from "../repository/sample.repository";
import { VariantService } from "./variant.service";

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
    const sample = SampleMapper.toDomain(input);
    return await this.sampleRepository.create(sample);
  }

  private handleNotFound(sample: Sample | undefined, id: Sample['id']): asserts sample is Sample {
    if (!sample) throw new NotFoundException(`Sample with id ${id} not found`);
  }

}