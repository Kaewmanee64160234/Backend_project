import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Catagory } from 'src/catagories/entities/catagory.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Catagory)
    private catagoriesRepository: Repository<Catagory>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const catagory = await this.catagoriesRepository.findOne({
      where: { id: createProductDto.catagoryId },
    });
    const newProduct = new Product();
    newProduct.name = createProductDto.name;
    newProduct.type = createProductDto.type;
    newProduct.size = createProductDto.size;
    newProduct.price = createProductDto.price;
    newProduct.image = createProductDto.image;
    newProduct.catagory = catagory;
    return this.productsRepository.save(createProductDto);
  }

  findAll() {
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
