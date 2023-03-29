import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { VenuePhotoController } from './venue-photo.controller';
import { VenuePhotoService } from './venue-photo.service';
import { VenuePhoto } from './models/venue-photo.model';

@Module({
  imports: [SequelizeModule.forFeature([VenuePhoto]), JwtModule],
  controllers: [VenuePhotoController],
  providers: [VenuePhotoService],
})
export class VenuePhotoModule {}
