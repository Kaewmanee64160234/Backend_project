import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Catagory } from 'src/catagories/entities/catagory.entity';
import { Material } from 'src/materials/entities/material.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Catagory)
    private categoryRepository: Repository<Catagory>,
    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
  ) {}

  getProduct() {
    return this.dataSource.query('SELECT * FROM product');
  }

  getProductBySearchText(searchText: any) {
    return this.dataSource.query(
      'SELECT * FROM product WHERE product_name LIKE "%' + searchText + '%"',
    );
  }

  getMaterial() {
    return this.dataSource.query('SELECT * FROM material');
  }

  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report';
  }

  findAll() {
    return `This action returns all reports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }

  getMaterialByUnit(unit: string) {
    return this.dataSource.query(
      'SELECT * FROM material WHERE mat_unit LIKE "%' + unit + '%"',
    );
  }

  async calledStoreGetProduct() {
    const products = await this.dataSource.query('CALL getProduct()');
    const productList = new Array<Product>();
    for (const product_ of products[0]) {
      const product = new Product();
      const cat = await this.categoryRepository.findOne({
        where: { id: product_.catagoryId },
      });
      product.id = product_.product_id;
      product.name = product_.product_name;
      product.type = product_.product_type;
      product.size = product_.product_size;
      product.price = product_.product_price;
      product.image = product_.image;
      product.createdAt = product_.createdAt;
      product.updatedAt = product_.updatedAt;
      product.catagory = cat;
      productList.push(product);
    }
    return productList;
  }
  async calledViewMaterial() {
    const material = await this.dataSource.query(
      'SELECT * FROM getMaterial_Box',
    );
    const materialList = new Array<Material>();
    for (const material_ of material) {
      const material = new Material();
      const mat = await this.materialsRepository.findOne({
        where: { unit: material_.unit },
      });
      material.id = material_.mat_id;
      material.name = material_.mat_name;
      material.min_quantity = material_.mat_min_quantity;
      material.quantity = material_.mat_quantity;
      material.price_per_unit = material_.mat_price_per_unit;
      material.unit = material_.mat_unit;
      material.createdAt = material_.mat_start_date;
      material.updatedAt = material_.mat_update_date;
      materialList.push(material);
    }
    return materialList;
  }
}
