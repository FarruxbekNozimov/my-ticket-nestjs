import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { SeatTypeController } from './seat-type.controller';
import { SeatTypeService } from './seat-type.service';
import { SeatType } from './models/seat-type.model';

@Module({
  imports: [SequelizeModule.forFeature([SeatType]), JwtModule],
  controllers: [SeatTypeController],
  providers: [SeatTypeService],
})
export class SeatTypeModule {}
