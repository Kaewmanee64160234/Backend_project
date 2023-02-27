import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Catagory } from './entities/catagory.entity';

@Injectable()
export class CatagoriesService {
  constructor(@InjectRepository(Catagory) private readonly catagoriesService: CatagoriesService) { }
  create(createCatagoryDto: CreateCatagoryDto) {
    return this.catagoriesService.save(createCatagoryDto);
  }

  findAll() {
    return `This action returns all catagories`;
  }

  async findOne(id: number) {
    const catagory = await this.catagoriesService.findOneBy({ id: id });
    if (!catagory) {
      throw new NotFoundException();
    }
    return this.catagoriesService.findOne({ where: { id: id } });
  }

  async update(id: number, updateCatagoryDto: UpdateCatagoryDto) {
    const catagory = await this.catagoriesService.findOneBy({ id: id });
    if (!catagory) {
      throw new NotFoundException();
    }
    const updatedCatagory = { ...catagory, ...updateCatagoryDto };
    return this.catagoriesService.save(updatedCatagory);
  }

  async remove(id: number) {
    const catagory = await this.catagoriesService.findOneBy({ id: id });
    if (!catagory) {
      throw new NotFoundException();
    }
    return this.catagoriesService.softRemove(catagory);
  }
}
