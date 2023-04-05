import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CheckMaterialService } from './check_material.service';
import { CreateCheckMaterialDto } from './dto/create-check_material.dto';
import { UpdateCheckMaterialDto } from './dto/update-check_material.dto';

@Controller('check-material')
export class CheckMaterialController {
  constructor(private readonly checkMaterialService: CheckMaterialService) {}

  @Post()
  create(@Body() createCheckMaterialDto: CreateCheckMaterialDto) {
    return this.checkMaterialService.create(createCheckMaterialDto);
  }

  @Get()
  findAll(@Query() query: { cat?: string }) {
    return this.checkMaterialService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkMaterialService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkMaterialService.remove(+id);
  }
  @Get('mat/:id')
  showBillAboutMat(@Param('id') id: string) {
    return this.checkMaterialService.showBillAboutMat(id);
  }
}
