import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class ReportsService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  getProduct() {
    return this.dataSource.query('SELECT * FROM product');
  }

  getProductBySearchText(searchText: any) {
    return this.dataSource.query(
      'SELECT * FROM product WHERE product_name LIKE "%' + searchText + '%"',
    );
  }

  calledStoreGetProduct() {
    return this.dataSource.query('CALL getProduct()');
  }
}
