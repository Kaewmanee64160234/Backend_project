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
import { Roles } from 'src/authorize/roles.decorator';
import { Role } from 'src/types/Role.enum';
import { RolesGuard } from 'src/authorize/roles.guard';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Employee, Role.Owner)
  // @UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(Role.Employee, Role.Owner)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialsService.update(+id, updateMaterialDto);
  }
  @Roles(Role.Employee, Role.Owner)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.remove(+id);
  }

  @Roles(Role.Employee, Role.Owner)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('search/name/:name')
  findMaterialByName(@Param('name') name: string) {
    return this.materialsService.findMaterialByName(name);
  }
  @Get('cmd/:id')
  findMaterialsDetailByMaterialId(@Param('id') id: string) {
    return this.materialsService.findMaterialsDetailByMaterialId(id);
  }
}
