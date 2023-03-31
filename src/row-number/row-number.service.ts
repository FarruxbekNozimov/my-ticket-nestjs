import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RowNumber } from './models/row-number.model';
import { CreateRowNumberDto } from './dto/create-row-number.dto';
import { UpdateRowNumberDto } from './dto/update-row-number.dto';

@Injectable()
export class RowNumberService {
  constructor(@InjectModel(RowNumber) private rowNumberRepo: typeof RowNumber) {}

  async create(createRowNumberDto: CreateRowNumberDto) {
    const res = await this.rowNumberRepo.create(createRowNumberDto);
    return res;
  }

  async findAll() {
    return await this.rowNumberRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.rowNumberRepo.findByPk(id);
  }

  async update(id: number, updateRowNumberDto: UpdateRowNumberDto) {
    return await this.rowNumberRepo.update(updateRowNumberDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.rowNumberRepo.destroy({ where: { id } });
    return result;
  }
}
