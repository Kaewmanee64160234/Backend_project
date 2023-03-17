import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { Catagory } from 'src/catagories/entities/catagory.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
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

  findAll(option) {
    return this.productsRepository.find(option);
  }

  findByCategory(id: number) {
    return this.productsRepository.find({ where: { catagoryId: id } });
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
  async findProductByName(name: string) {
    try {
      const products = await this.dataSource.query(
        'SELECT * FROM product WHERE product_name LIKE ?',
        [`%${name}%`],
      );
      const productList = new Array<Product>();
      for (let i = 0; i < products.length; i++) {
        const product = new Product();
        product.id = products[i].id;
        product.name = products[i].product_name;
        product.type = products[i].product_type;
        product.size = products[i].product_size;
        product.price = products[i].product_price;
        product.catagory = await this.catagoriesRepository.findOne({
          where: { id: products[i].catagoryId },
        });
        product.image = products[i].image;
        product.createdAt = products[i].createdAt;
        product.updatedAt = products[i].updatedAt;
        product.deletedAt = products[i].deletedAt;
        productList.push(product);
      }
      // console.log(productList);
      return productList;
    } catch (e) {
      console.log(e);
    }
  }
}
