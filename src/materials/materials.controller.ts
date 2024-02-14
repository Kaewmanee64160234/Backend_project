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
  UseInterceptors,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/authorize/roles.decorator';
import { Role } from 'src/types/Role.enum';
import { RolesGuard } from 'src/authorize/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid4 } from 'uuid';
import { Response, Request } from 'express';
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}
  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Employee, Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './material_images',
        filename: (req, file, cb) => {
          const name = uuid4();
          return cb(null, name + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @Body() createMaterialDto: CreateMaterialDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createMaterialDto.image = file.filename;
    return this.materialsService.create(createMaterialDto);
  }

  @Get('image/:imageFile')
  async getImageByFileName(
    @Param('imageFile') imageFile: string,
    @Res() res: Response,
  ) {
    res.sendFile(imageFile, { root: './material_images' });
  }
  @Get()
  findAll(@Query() query: { emp?: string }) {
    return this.materialsService.findAll(query);
  }
  @Get('all')
  findAllMaterial() {
    return this.materialsService.findAllMaterial();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(+id);
  }
  @Roles(Role.Employee, Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './material_images',
        filename: (req, file, cb) => {
          const name = uuid4();
          return cb(null, name + extname(file.originalname));
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,

    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    if (file) {
      updateMaterialDto.image = file.filename;
    }

    return this.materialsService.update(+id, updateMaterialDto);
  }
  @Roles(Role.Employee, Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.remove(+id);
  }

  @Roles(Role.Employee, Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('search/name/:name')
  findMaterialByName(@Param('name') name: string) {
    return this.materialsService.findMaterialByName(name);
  }
  @Get('cmd/:id')
  findMaterialsDetailByMaterialId(@Param('id') id: string) {
    return this.materialsService.findMaterialsDetailByMaterialId(id);
  }

  @Patch(':id/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './material_images',
        filename: (req, file, cb) => {
          const name = uuid4();
          return cb(null, name + extname(file.originalname));
        },
      }),
    }),
  )
  updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.materialsService.update(+id, { image: file.filename });
  }
}
