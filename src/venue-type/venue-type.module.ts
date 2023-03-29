import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { VenueTypeController } from './venue-type.controller';
import { VenueTypeService } from './venue-type.service';
import { VenueType } from './models/venue-type.model';

@Module({
  imports: [SequelizeModule.forFeature([VenueType]), JwtModule],
  controllers: [VenueTypeController],
  providers: [VenueTypeService],
})
export class VenueTypeModule {}
