import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/authorize/roles.guard';
import { Role } from 'src/types/Role.enum';
import { Roles } from 'src/authorize/roles.decorator';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}
  @Roles(Role.Employee, Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createBillDto: CreateBillDto) {
    return this.billsService.create(createBillDto);
  }
  @Roles(Role.Employee, Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.billsService.findAll();
  }
  @Roles(Role.Employee, Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billsService.findOne(+id);
  }
  @Roles(Role.Employee, Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('updated')
  update(@Body() updateBillDto: UpdateBillDto) {
    return this.billsService.updateBill(updateBillDto);
  }
  @Roles(Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billsService.remove(+id);
  }
}
