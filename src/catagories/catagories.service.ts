import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';

@Injectable()
export class CatagoriesService {
  create(createCatagoryDto: CreateCatagoryDto) {
    return this.catagoriesRepository.save(createCatagoryDto);
  }

  findAll() {
    return `This action returns all catagories`;
  }

<<<<<<< HEAD
  findOne(id: number) {
    return `This action returns a #${id} catagory`;
=======
  async findOne(id: number) {
    const catagory = await this.catagoriesRepository.findOne({
      where: { id: id },
    });
    if (!catagory) {
      throw new NotFoundException();
    }
    return this.catagoriesRepository.findOne({ where: { id: id } });
>>>>>>> c9447d58e11ca83c0e8222d5b140d619de93169b
  }

  async update(id: number, updateCatagoryDto: UpdateCatagoryDto) {
    const catagory = await this.catagoriesRepository.findOneBy({ id: id });
    if (!catagory) {
      throw new NotFoundException();
    }
    const updatedCatagory = { ...catagory, ...updateCatagoryDto };
    return this.catagoriesRepository.save(updatedCatagory);
  }

  async remove(id: number) {
    const catagory = await this.catagoriesRepository.findOneBy({ id: id });
    if (!catagory) {
      throw new NotFoundException();
    }
    return this.catagoriesRepository.softRemove(catagory);
  }
}
