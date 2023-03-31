import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Flat } from './models/flat.model';
import { CreateFlatDto } from './dto/create-flat.dto';
import { UpdateFlatDto } from './dto/update-flat.dto';

@Injectable()
export class FlatService {
  constructor(@InjectModel(Flat) private flatRepo: typeof Flat) {}

  async create(createFlatDto: CreateFlatDto) {
    const res = await this.flatRepo.create(createFlatDto);
    return res;
  }

  async findAll() {
    return await this.flatRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.flatRepo.findByPk(id);
  }

  async update(id: number, updateFlatDto: UpdateFlatDto) {
    return await this.flatRepo.update(updateFlatDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.flatRepo.destroy({ where: { id } });
    return result;
  }
}
