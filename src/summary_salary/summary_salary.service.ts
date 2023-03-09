import { Injectable } from '@nestjs/common';
import { CreateSummarySalaryDto } from './dto/create-summary_salary.dto';
import { UpdateSummarySalaryDto } from './dto/update-summary_salary.dto';

@Injectable()
export class SummarySalaryService {
  create(createSummarySalaryDto: CreateSummarySalaryDto) {
    return 'This action adds a new summarySalary';
  }

  findAll() {
    return `This action returns all summarySalary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} summarySalary`;
  }

  update(id: number, updateSummarySalaryDto: UpdateSummarySalaryDto) {
    return `This action updates a #${id} summarySalary`;
  }

  remove(id: number) {
    return `This action removes a #${id} summarySalary`;
  }
}
