import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    return this.productsRepository.save(createProductDto);
  }

  findAll() {
<<<<<<< HEAD
    return this.productsRspository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
=======
    return this.productsRepository.find({ relations: ['catagory'] });
  }

  findOne(id: number) {
    const product = this.productsRepository.findOne({
      where: { id: id },
      relations: ['catagory'],
    });
    if (!product) {
      throw new NotFoundException();
    }
    return this.productsRepository.findOne({ where: { id: id } });
>>>>>>> c9447d58e11ca83c0e8222d5b140d619de93169b
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOneBy({ id: id });
    if (!product) {
      throw new NotFoundException();
    }
    const updatedProduct = { ...product, ...updateProductDto };
    return this.productsRepository.save(updatedProduct);
  }

  async remove(id: number) {
    const product = await this.productsRepository.findOneBy({ id: id });
    if (!product) {
      throw new NotFoundException();
    }
    return this.productsRepository.softRemove(product);
  }
}
