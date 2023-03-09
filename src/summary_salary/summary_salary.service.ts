import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSummarySalaryDto } from './dto/create-summary_salary.dto';
import { UpdateSummarySalaryDto } from './dto/update-summary_salary.dto';
import { SummarySalary } from './entities/summary_salary.entity';

@Injectable()
export class SummarySalaryService {
  constructor(
    @InjectRepository(SummarySalary)
    private readonly summaryRepository: Repository<SummarySalary>,
  ) {}

  create(createSummarySalaryDto: CreateSummarySalaryDto) {
    return this.summaryRepository.save(createSummarySalaryDto);
  }

  findAll() {
    return this.summaryRepository.find();
  }

  findOne(id: number) {
    return this.summaryRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateSummarySalaryDto: UpdateSummarySalaryDto) {
    const summary = await this.summaryRepository.findOne({ where: { id: id } });
    if (summary) {
      throw new NotFoundException();
    }
    const summaryUpdate = {
      ...summary,
      updateSummarySalaryDto,
    };

    return this.summaryRepository.save(summaryUpdate);
  }

  async remove(id: number) {
    const summary = await this.summaryRepository.findOne({ where: { id: id } });
    return this.summaryRepository.softRemove(summary);
  }
}
