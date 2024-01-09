import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToppingDto } from './dto/create-topping.dto';
import { UpdateToppingDto } from './dto/update-topping.dto';
import { DataSource, Like, Repository } from 'typeorm';
import { Topping } from './entities/topping.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Catagory } from 'src/catagories/entities/catagory.entity';

@Injectable()
export class ToppingsService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Topping) private toppingsRepository: Repository<Topping>,
    @InjectRepository(Catagory)
    private catagoriesRepository: Repository<Catagory>,
  ) {}

  async create(createToppingDto: CreateToppingDto) {
    try {
      const newTopping = new Topping();
      newTopping.name = createToppingDto.name;
      newTopping.price = createToppingDto.price;
      // newTopping.image = createToppingDto.image;
      const category_ = await this.catagoriesRepository.findOne({
        where: { id: createToppingDto.catagoryId },
      });
      newTopping.category = category_;

      return await this.toppingsRepository.save(newTopping);
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(query): Promise<Topping[]> {
    const keyword = query.keyword || '';
    return this.toppingsRepository.find({
      where: { name: Like(`%${keyword}%`) },
    });
  }

  async findOne(id: number) {
    return await this.toppingsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateToppingDto: UpdateToppingDto) {
    const existingTopping = await this.toppingsRepository.findOne({
      where: { id: id },
    });
    if (!existingTopping) {
      throw new NotFoundException(`Topping with ID ${id} not found.`);
    }
    const updatedTopping = { ...existingTopping, ...updateToppingDto };
    return await this.toppingsRepository.save(updatedTopping);
  }
  async remove(id: number) {
    const existingTopping = await this.toppingsRepository.findOne({
      where: { id: id },
    });
    if (!existingTopping) {
      throw new NotFoundException(`Topping with ID ${id} not found.`);
    }
    return this.toppingsRepository.remove(existingTopping);
  }

  //get topping by category id
  async getToppingByCatId(id: number) {
    return await this.toppingsRepository.find({
      where: { category: { id: id } },
    });
  }
}
