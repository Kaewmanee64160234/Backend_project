import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.checkMaterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkMaterialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckMaterialDto: UpdateCheckMaterialDto) {
    return this.checkMaterialService.update(+id, updateCheckMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkMaterialService.remove(+id);
  }
}
