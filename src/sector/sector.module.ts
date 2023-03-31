import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { SectorController } from './sector.controller';
import { SectorService } from './sector.service';
import { Sector } from './models/sector.model';

@Module({
  imports: [SequelizeModule.forFeature([Sector]), JwtModule],
  controllers: [SectorController],
  providers: [SectorService],
})
export class SectorModule {}
