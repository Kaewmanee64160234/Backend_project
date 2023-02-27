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
    return this.catagoriesRepository.save(createCatagoryDto);
  }

  findAll() {
    return this.catagoriesRepository.find();
  }

  findOne(id: number) {
    return this.catagoriesRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateCatagoryDto: UpdateCatagoryDto) {
    const catagory = await this.catagoriesRepository.findOneBy({ id: id });
    const updatedCatagory = { ...catagory, ...updateCatagoryDto };
    return this.catagoriesRepository.save(updatedCatagory);
  }

  async remove(id: number) {
    const catagory = await this.catagoriesRepository.findOneBy({ id: id });
    return this.catagoriesRepository.softRemove(catagory);
  }
}
