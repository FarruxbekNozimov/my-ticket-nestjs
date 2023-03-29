import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SeatType } from './models/seat-type.model';
import { CreateSeatTypeDto } from './dto/create-seat-type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat-type.dto';

@Injectable()
export class SeatTypeService {
  constructor(@InjectModel(SeatType) private seatTypeRepo: typeof SeatType) {}

  async create(createSeatTypeDto: CreateSeatTypeDto) {
    const res = await this.seatTypeRepo.create(createSeatTypeDto);
    return res;
  }

  async findAll() {
    return await this.seatTypeRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.seatTypeRepo.findByPk(id);
  }

  async update(id: number, updateSeatTypeDto: UpdateSeatTypeDto) {
    return await this.seatTypeRepo.update(updateSeatTypeDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.seatTypeRepo.destroy({ where: { id } });
    return result;
  }
}
