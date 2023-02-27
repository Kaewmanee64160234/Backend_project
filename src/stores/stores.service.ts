import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store) private storesRepository: Repository<Store>,
  ) {}
  create(createStoreDto: CreateStoreDto) {
    return this.storesRepository.save(createStoreDto);
  }

  findAll() {
    return this.storesRepository.find();
  }

  findOne(id: number) {
    return this.storesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const store = await this.storesRepository.findOneBy({ id });
    if (!store) {
      throw new NotFoundException();
    }
    const updatedStore = { ...store, ...updateStoreDto };

    return this.storesRepository.save(updateStoreDto);
  }

  async remove(id: number) {
    const store = await this.storesRepository.findOneBy({ id });
    if (!store) {
      throw new NotFoundException();
    }
    return this.storesRepository.softDelete(store);
  }
}
