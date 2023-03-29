import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { VenueController } from './venue.controller';
import { VenueService } from './venue.service';
import { Venue } from './models/venue.model';

@Module({
  imports: [SequelizeModule.forFeature([Venue]), JwtModule],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}
