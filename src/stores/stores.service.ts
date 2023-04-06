import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
  ) {}
  create(createStoreDto: CreateStoreDto) {
    console.log(createStoreDto)
    return this.storesRepository.save(createStoreDto);
  }

  async findAll(query) {
    const page = query.page || 1;
    const take = query.take || 10;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';
    const orderBy = query.orderBy || 'name';
    const order = query.order || 'ASC';
    const currentPage = page;

    const [result, total] = await this.storesRepository.findAndCount({
      where: { name: Like(`%${keyword}%`) },
      order: { [orderBy]: order },

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
    const store = await this.storesRepository.findOneBy({ id: id });
    if (!store) {
      throw new NotFoundException('Store Not Found');
    } else {
      return store;
    }
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const store = await this.storesRepository.findOneBy({ id });
    if (!store) {
      throw new NotFoundException();
    }
    const updatedStore = { ...store, ...updateStoreDto };

    return this.storesRepository.save(updatedStore);
  }

  async remove(id: number) {
    const store = await this.storesRepository.findOneBy({ id });
    if (!store) {
      throw new NotFoundException();
    }
    return this.storesRepository.softRemove(store);
  }
}
