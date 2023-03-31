import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FinishAge } from './models/finish-age.model';
import { CreateFinishAgeDto } from './dto/create-finish-age.dto';
import { UpdateFinishAgeDto } from './dto/update-finish-age.dto';

@Injectable()
export class FinishAgeService {
  constructor(@InjectModel(FinishAge) private finishAgeRepo: typeof FinishAge) {}

  async create(createFinishAgeDto: CreateFinishAgeDto) {
    const res = await this.finishAgeRepo.create(createFinishAgeDto);
    return res;
  }

  async findAll() {
    return await this.finishAgeRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.finishAgeRepo.findByPk(id);
  }

  async update(id: number, updateFinishAgeDto: UpdateFinishAgeDto) {
    return await this.finishAgeRepo.update(updateFinishAgeDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.finishAgeRepo.destroy({ where: { id } });
    return result;
  }
}
