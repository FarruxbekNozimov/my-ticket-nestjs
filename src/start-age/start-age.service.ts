import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StartAge } from './models/start-age.model';
import { CreateStartAgeDto } from './dto/create-start-age.dto';
import { UpdateStartAgeDto } from './dto/update-start-age.dto';

@Injectable()
export class StartAgeService {
  constructor(@InjectModel(StartAge) private startAgeRepo: typeof StartAge) {}

  async create(createStartAgeDto: CreateStartAgeDto) {
    const res = await this.startAgeRepo.create(createStartAgeDto);
    return res;
  }

  async findAll() {
    return await this.startAgeRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.startAgeRepo.findByPk(id);
  }

  async update(id: number, updateStartAgeDto: UpdateStartAgeDto) {
    return await this.startAgeRepo.update(updateStartAgeDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.startAgeRepo.destroy({ where: { id } });
    return result;
  }
}
