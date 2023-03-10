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

  findAll(option) {
    return this.summaryRepository.find(option);
  }

  async findOne(id: number) {
    const summary_salary = await this.summaryRepository.findOne({
      where: { id: id },
    });

    if (summary_salary) {
      return summary_salary;
    } else {
      throw new NotFoundException('Summary Salary not found');
    }
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
