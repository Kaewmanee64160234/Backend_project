import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './employee_images',
        filename: (req, file, cb) => {
          const name = uuidv4();
          return cb(null, name + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createEmployeeDto.image = file.filename;
    return this.employeesService.create(createEmployeeDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }
  @Get(':id/image')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    const employee = await this.employeesService.findOne(+id);
    res.sendFile(employee.image, { root: './employee_images' });
  }

  @Get('image/:imageFile')
  async getImageByFileName(
    @Param('imageFile') imageFile: string,
    @Res() res: Response,
  ) {
    res.sendFile(imageFile, { root: './employee_images' });
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './employee_images',
        filename: (req, file, cb) => {
          const name = uuidv4();
          return cb(null, name + extname(file.originalname));
        },
      }),
    }),
  )
  updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.employeesService.update(+id, { image: file.filename });
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
