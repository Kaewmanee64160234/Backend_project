import { Injectable } from '@nestjs/common';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Catagory } from './entities/catagory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatagoriesService {
  constructor(
    @InjectRepository(Catagory)
    private catagoriesRepository: Repository<Catagory>,
  ) {}
  create(createCatagoryDto: CreateCatagoryDto) {
    return 'This action adds a new catagory';
  }

  findAll() {
    return this.catagoriesRepository.find();
  }

  findOne(id: number) {
    return this.catagoriesRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateCatagoryDto: UpdateCatagoryDto) {
    return `This action updates a #${id} catagory`;
  }

  remove(id: number) {
    return `This action removes a #${id} catagory`;
  }
}
