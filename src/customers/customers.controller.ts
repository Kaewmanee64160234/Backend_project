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
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './customer_images',
        filename: (req, file, cb) => {
          const name = uuidv4();
          return cb(null, name + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createCustomerDto.image = file.filename;
    }
    return await this.customersService.create(createCustomerDto);
  }

  @Get('image/:image_file')
  async getImageByFileName(
    @Param('image_file') ImageFileName: string,
    @Res() res: Response,
  ) {
    res.sendFile(ImageFileName, { root: './customer_images' });
  }
  @Get(':id/image')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    const product = await this.customersService.findOne(+id);
    res.sendFile(product.image, { root: './customer_images' });
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './customer_images',
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
    return this.customersService.update(+id, { image: file.filename });
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: { cus?: string }) {
    return this.customersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './customer_images',
        filename: (req, file, cb) => {
          const name = uuidv4();
          return cb(null, name + extname(file.originalname));
        },
      }),
    }),
  )
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateCustomerDto.image = file.filename;
    }
    return await this.customersService.update(+id, updateCustomerDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }

  @Patch('customers/point/:id')
  updatePointCustomer(
    @Param('id') id: string,
    @Body('customer') updateCustomerDto: UpdateCustomerDto,
    @Body('point') point: number,
  ) {
    return this.customersService.upDatePointCustomer(
      id,
      point,
      updateCustomerDto,
    );
  }
  @Get('search/tel/:tel')
  findCustomerByTel(@Param('tel') tel: string) {
    return this.customersService.findCustomerByTel(tel);
  }
}
