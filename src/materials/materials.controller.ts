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
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}
  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @Get()
  findAll(@Query() query: { emp?: string }) {
    return this.materialsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialsService.update(+id, updateMaterialDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/name/:name')
  findMaterialByName(@Param('name') name: string) {
    return this.materialsService.findMaterialByName(name);
  }
  @Get('cmd/:id')
  findMaterialsDetailByMaterialId(@Param('id') id: string ) {
    return this.materialsService.findMaterialsDetailByMaterialId(id);
  }
}
