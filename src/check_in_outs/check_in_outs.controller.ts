import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CheckInOutsService } from './check_in_outs.service';
import { CreateCheckInOutDto } from './dto/create-check_in_out.dto';
import { UpdateCheckInOutDto } from './dto/update-check_in_out.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/authorize/roles.guard';
import { Role } from 'src/types/Role.enum';
import { Roles } from 'src/authorize/roles.decorator';

@Controller('check-in-outs')
export class CheckInOutsController {
  constructor(private readonly checkInOutsService: CheckInOutsService) {}
  @Post()
  create(@Body() createCheckInOutDto: CreateCheckInOutDto) {
    return this.checkInOutsService.create(createCheckInOutDto);
  }
  // @Get()
  // findAll(@Query() query: { cat?: string }) {
  //   return this.productsService.findAll({
  //     relations: ['catagory'],
  //     where: query.cat ? { catagoryId: parseInt(query.cat) } : {},
  //   });
  // }
  @Get()
  findAll(@Query() query: { cus?: string }) {
    return this.checkInOutsService.findAll({
      relations: ['employee', 'summary_salary'],
      where: query.cus ? { employeeId: parseInt(query.cus) } : {},
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkInOutsService.findOne(+id);
  }

  @Roles(Role.Employee, Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string): Promise<
    {
      id: number;
      date: Date;
      time_in: Date;
      time_out: Date;
      total_hour: number;
      employee: import('d:/dcoffee/backend-project/src/employees/entities/employee.entity').Employee;
      summary_salary: import('d:/dcoffee/backend-project/src/summary_salary/entities/summary_salary.entity').SummarySalary;
      createdDate: Date;
      updatedDate: Date;
      deletedDate: Date;
    } & import('d:/dcoffee/backend-project/src/check_in_outs/entities/check_in_out.entity').CheckInOut
  > {
    return this.checkInOutsService.updated(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('update-data/:id')
  updateData(
    @Param('id') id: string,
    @Body() updateCheckInOutDto: UpdateCheckInOutDto,
  ) {
    return this.checkInOutsService.upDateData(+id, updateCheckInOutDto);
  }

  @Roles(Role.Employee, Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkInOutsService.remove(+id);
  }
}
