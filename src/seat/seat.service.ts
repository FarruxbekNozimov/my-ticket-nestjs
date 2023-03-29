import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Seat } from './models/seat.model';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Injectable()
export class SeatService {
  constructor(@InjectModel(Seat) private seatRepo: typeof Seat) {}

  async create(createSeatDto: CreateSeatDto) {
    const res = await this.seatRepo.create(createSeatDto);
    return res;
  }

  async findAll() {
    return await this.seatRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.seatRepo.findByPk(id);
  }

  async update(id: number, updateSeatDto: UpdateSeatDto) {
    return await this.seatRepo.update(updateSeatDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.seatRepo.destroy({ where: { id } });
    return result;
  }
}
