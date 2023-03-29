import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { SeatController } from './seat.controller';
import { SeatService } from './seat.service';
import { Seat } from './models/seat.model';

@Module({
  imports: [SequelizeModule.forFeature([Seat]), JwtModule],
  controllers: [SeatController],
  providers: [SeatService],
})
export class SeatModule {}
