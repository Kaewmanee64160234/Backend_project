import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SummarySalaryService } from './summary_salary.service';
import { CreateSummarySalaryDto } from './dto/create-summary_salary.dto';
import { UpdateSummarySalaryDto } from './dto/update-summary_salary.dto';

@Controller('summary-salary')
export class SummarySalaryController {
  constructor(private readonly summarySalaryService: SummarySalaryService) {}

  @Post()
  create(@Body() createSummarySalaryDto: CreateSummarySalaryDto) {
    return this.summarySalaryService.create(createSummarySalaryDto);
  }

  @Get()
  findAll() {
    return this.summarySalaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.summarySalaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSummarySalaryDto: UpdateSummarySalaryDto) {
    return this.summarySalaryService.update(+id, updateSummarySalaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.summarySalaryService.remove(+id);
  }
}
