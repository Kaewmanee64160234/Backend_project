import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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

  async findAll(query) {
    const page = query.page || 1;
    const take = query.take || 10;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';
    const orderBy = query.orderBy || 'name';
    const order = query.order || 'ASC';
    const currentPage = page;

    const [result, total] = await this.summaryRepository.findAndCount({
      where: { checkInOut: { employee: { name: Like(`%${keyword}%`) } } },
      relations: ['checkInOut', 'checkInOut.employee'],
      order: { checkInOut: { employee: { name: order } } },

      take: take,
      skip: skip,
    });
    const lastPage = Math.ceil(total / take);
    return {
      data: result,
      count: total,
      currentPage: currentPage,
      lastPage: lastPage,
    };
    return this.summaryRepository.find({
      relations: ['checkInOut', 'checkInOut.employee'],
      order: { checkInOut: { employee: { name: 'ASC' } } },
    });
  }

  async findOne(id: number) {
    const summary_salary = await this.summaryRepository.findOne({
      relations: ['check_in_outs'],
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
  async findOneByEmployee(employeeId: number) {
    const summary = await this.summaryRepository.find({
      relations: ['checkInOut', 'checkInOut.employee'],
      where: { checkInOut: { employee: { id: employeeId } } },
    });
    return summary;
  }

  async remove(id: number) {
    const summary = await this.summaryRepository.findOne({ where: { id: id } });
    return this.summaryRepository.softRemove(summary);
  }
}
