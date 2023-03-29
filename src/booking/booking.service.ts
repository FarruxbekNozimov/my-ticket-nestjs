import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './models/booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking) private bookingRepo: typeof Booking) {}

  async create(createBookingDto: CreateBookingDto) {
    const res = await this.bookingRepo.create(createBookingDto);
    return res;
  }

  async findAll() {
    return await this.bookingRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.bookingRepo.findByPk(id);
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    return await this.bookingRepo.update(updateBookingDto, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    const result = await this.bookingRepo.destroy({ where: { id } });
    return result;
  }
}
