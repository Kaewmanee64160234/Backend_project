import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { query } from 'express';
import { Customer } from 'src/customers/entities/customer.entity';
import { Store } from 'src/stores/entities/store.entity';
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('/product')
  getProduct(
    @Query()
    query: {
      lowPrice?: number;
      upperPrice?: number;
      searchText?: string;
    },
  ) {
    console.log(query);
    if (query.searchText) {
      return this.reportsService.getProductBySearchText(query.searchText);
    }
    return this.reportsService.getProduct();
  }

  @Get('/material')
  getMaterial(
    @Query()
    query: {
      lowPrice?: number;
      upperPrice?: number;
      searchText?: string;
    },
  ) {
    console.log(query);
    if (query.searchText) {
      return this.reportsService.getMaterialByUnit(query.searchText);
    }
    return this.reportsService.getMaterial();
  }

  // @Post()
  // create(@Body() createReportDto: CreateReportDto) {
  //   return this.reportsService.create(createReportDto);
  // }

  @Get('/products')
  callStored() {
    return this.reportsService.calledStoreGetProduct();
  }

  @Get('/reg')
  testRegX(@Body() store: Store) {
    return this.reportsService.testRegXData(store);
  }

  @Get('/material/view')
  callView() {
    return this.reportsService.calledViewMaterial();
  }
  @Get('/regCustomer')
  regCus(@Body() customer: Customer) {
    return this.reportsService.regCustomer(customer);
  }
}
