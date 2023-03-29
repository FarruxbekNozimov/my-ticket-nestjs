import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './models/booking.model';

@Module({
  imports: [SequelizeModule.forFeature([Booking]), JwtModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
