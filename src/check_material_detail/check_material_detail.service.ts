import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckMaterialDetailDto } from './dto/create-check_material_detail.dto';
import { UpdateCheckMaterialDetailDto } from './dto/update-check_material_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckMaterialDetail } from './entities/check_material_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckMaterialDetailService {
  constructor(
    @InjectRepository(CheckMaterialDetail)
    private CheckMaterialsDetailRepository: Repository<CheckMaterialDetail>,
  ) {}
  create(createCheckMaterialDetailDto: CreateCheckMaterialDetailDto) {
    return this.CheckMaterialsDetailRepository.save(createCheckMaterialDetailDto);
  }

  findAll() {
    return this.CheckMaterialsDetailRepository.find();
  }

  async findOne(id: number) {
    const Checkmaterialdetail = await this.CheckMaterialsDetailRepository.findOneBy({ id: id });
    if (!Checkmaterialdetail) {
      throw new NotFoundException;
    } else {
      return Checkmaterialdetail;
    }
  }

  async update(id: number, updateCheckMaterialDetailDto: UpdateCheckMaterialDetailDto) {
    const Checkmaterialdetail = await this.CheckMaterialsDetailRepository.findOneBy({ id: id });
    if (!Checkmaterialdetail) {
      throw new NotFoundException('Material not found');
    } else {
      const updatedMaterial = {
        ...Checkmaterialdetail,
        ...updateCheckMaterialDetailDto,
      };
      return this.CheckMaterialsDetailRepository.save(updateCheckMaterialDetailDto);
    }
  }

  async remove(id: number) {
    const Checkmaterialdetail = await this.CheckMaterialsDetailRepository.findOne({
      where: { id: id },
    });
    if (!Checkmaterialdetail) {
      throw new NotFoundException();
    } else {
      await this.CheckMaterialsDetailRepository.softRemove(Checkmaterialdetail);
    }
    return Checkmaterialdetail;
  }
}
