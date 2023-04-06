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

  @Get('/product/:id')
  callStored() {
    return this.reportsService.calledStoreGetProduct();
  }
}
