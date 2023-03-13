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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string) {
    return this.checkInOutsService.updated(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkInOutsService.remove(+id);
  }
}
