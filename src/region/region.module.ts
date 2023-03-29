import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { Region } from './models/region.model';

@Module({
  imports: [SequelizeModule.forFeature([Region]), JwtModule],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
