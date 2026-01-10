import { SampleMapper } from "src/api/mappers/sample.mapper";
import { CreateSampleInput, Sample, SampleDTO } from "src/api/schemas/sample.schema";
import { NotFoundException } from "../exceptions/not-found";
import { ISampleRepository } from "../repository/sample.repository";

export class SampleService {
  constructor(protected readonly sampleRepository: ISampleRepository) { }
  
  async findAll(): Promise<Sample[]> {
    return await this.sampleRepository.findAll();
  }

  async findByIdOrException(id: Sample["id"]): Promise<SampleDTO> {
    const sample = await this.sampleRepository.findById(id);
    this.handleNotFound(sample, id);
    return SampleMapper.toResponse(sample);
  }

  async create(sample: CreateSampleInput): Promise<Sample | undefined> {
    return await this.sampleRepository.create(sample);
  }

  private handleNotFound(sample: Sample | undefined, id: Sample['id']): asserts sample is Sample {
    if (!sample) throw new NotFoundException(`Sample with id ${id} not found`);
  }

}