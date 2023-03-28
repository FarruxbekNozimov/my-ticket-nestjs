import { Module } from '@nestjs/common';
import { RegionService } from './example.service';
import { RegionController } from './example.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './models/example.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Region]), JwtModule],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
