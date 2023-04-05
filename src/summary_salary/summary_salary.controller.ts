import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SummarySalaryService } from './summary_salary.service';
import { CreateSummarySalaryDto } from './dto/create-summary_salary.dto';
import { UpdateSummarySalaryDto } from './dto/update-summary_salary.dto';
import { Roles } from 'src/authorize/roles.decorator';
import { Role } from 'src/types/Role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/authorize/roles.guard';

@Controller('summary-salary')
export class SummarySalaryController {
  constructor(private readonly summarySalaryService: SummarySalaryService) {}
  @Roles(Role.Owner, Role.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createSummarySalaryDto: CreateSummarySalaryDto) {
    return this.summarySalaryService.create(createSummarySalaryDto);
  }

  @Get()
  findAll(@Query() query: { cat?: string }) {
    return this.summarySalaryService.findAll(query);
  }
  @Roles(Role.Owner, Role.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.summarySalaryService.findOne(+id);
  }
  @Roles(Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSummarySalaryDto: UpdateSummarySalaryDto,
  ) {
    return this.summarySalaryService.update(+id, updateSummarySalaryDto);
  }
  @Roles(Role.Owner, Role.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.summarySalaryService.remove(+id);
  }
  @Roles(Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('employee/:id')
  findOneByEmployee(@Param('id') id: string) {
    return this.summarySalaryService.findOneByEmployee(+id);
  }
}
