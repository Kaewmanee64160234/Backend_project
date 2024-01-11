import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckMaterialsDetailsService } from './check-materials-details.service';
import { CreateCheckMaterialsDetailDto } from './dto/create-check-materials-detail.dto';
import { UpdateCheckMaterialsDetailDto } from './dto/update-check-materials-detail.dto';

@Controller('check-materials-details')
export class CheckMaterialsDetailsController {
  constructor(private readonly checkMaterialsDetailsService: CheckMaterialsDetailsService) {}

  @Post()
  create(@Body() createCheckMaterialsDetailDto: CreateCheckMaterialsDetailDto) {
    return this.checkMaterialsDetailsService.create(createCheckMaterialsDetailDto);
  }

  @Get()
  findAll() {
    return this.checkMaterialsDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkMaterialsDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckMaterialsDetailDto: UpdateCheckMaterialsDetailDto) {
    return this.checkMaterialsDetailsService.update(+id, updateCheckMaterialsDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkMaterialsDetailsService.remove(+id);
  }
}
