import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { District } from './models/district.model';

@Module({
  imports: [SequelizeModule.forFeature([District]), JwtModule],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
