import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToppingDto } from './dto/create-topping.dto';
import { UpdateToppingDto } from './dto/update-topping.dto';
import { DataSource, Like, Repository } from 'typeorm';
import { Topping } from './entities/topping.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Catagory } from 'src/catagories/entities/catagory.entity';
import { Paginate } from 'src/types/Paginate';

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
        where: { id: createToppingDto.category.id },
      });
      newTopping.catagory = category_;

      return await this.toppingsRepository.save(newTopping);
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(query): Promise<Paginate> {
    const page = query.page || 1;
    const take = query.take || 10;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';
    const orderBy = query.orderBy || 'name';
    const order = query.order || 'ASC';
    const currentPage = page;

    const [result, total] = await this.toppingsRepository.findAndCount({
      where: { name: Like(`%${keyword}%`) },
      order: { [orderBy]: order },
      relations: ['catagory'], // Correct relation name is 'category'
      take: take,
      skip: skip,
    });
    const lastPage = Math.ceil(total / take);
    return {
      data: result,
      count: total,
      currentPage: currentPage,
      lastPage: lastPage,
    };
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
      where: { catagory: { id: id } },
    });
  }
}
