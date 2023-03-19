import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CheckMaterialDetailService } from './check_material_detail.service';
import { CreateCheckMaterialDetailDto } from './dto/create-check_material_detail.dto';
import { UpdateCheckMaterialDetailDto } from './dto/update-check_material_detail.dto';

@Controller('check-material-detail')
export class CheckMaterialDetailController {
  constructor(
    private readonly checkMaterialDetailService: CheckMaterialDetailService,
  ) {}

  @Post()
  create(@Body() createCheckMaterialDetailDto: CreateCheckMaterialDetailDto) {
    return this.checkMaterialDetailService.create(createCheckMaterialDetailDto);
  }

  @Get()
  findAll() {
    return this.checkMaterialDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkMaterialDetailService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkMaterialDetailService.remove(+id);
  }
}
