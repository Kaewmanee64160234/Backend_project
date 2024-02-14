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
import { CheckMaterialService } from './check_material.service';
import { CreateCheckMaterialDto } from './dto/create-check_material.dto';
import { UpdateCheckMaterialDto } from './dto/update-check_material.dto';
import { Role } from 'src/types/Role.enum';
import { Roles } from 'src/authorize/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/authorize/roles.guard';

@Controller('check-material')
export class CheckMaterialController {
  constructor(private readonly checkMaterialService: CheckMaterialService) {}
  @Roles(Role.Owner, Role.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCheckMaterialDto: CreateCheckMaterialDto) {
    return this.checkMaterialService.create(createCheckMaterialDto);
  }
  @Roles(Role.Owner, Role.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll(@Query() query: { cat?: string }) {
    return this.checkMaterialService.findAll(query);
  }
  @Roles(Role.Owner, Role.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkMaterialService.findOne(+id);
  }
  @Roles(Role.Owner, Role.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkMaterialService.remove(+id);
  }
  @Roles(Role.Owner, Role.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('mat/:id')
  showBillAboutMat(@Param('id') id: string) {
    return this.checkMaterialService.showBillAboutMat(id);
  }
  // @Get('search/:id')
  // findCheckMaterialByID(@Param('id') id: string) {
  //   return this.checkMaterialService.findCheckMaterialByID(id);
  // }
}
