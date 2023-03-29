import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VenuePhoto } from './models/venue-photo.model';
import { CreateVenuePhotoDto } from './dto/create-venue-photo.dto';
import { UpdateVenuePhotoDto } from './dto/update-venue-photo.dto';

@Injectable()
export class VenuePhotoService {
  constructor(@InjectModel(VenuePhoto) private venuePhotoRepo: typeof VenuePhoto) {}

  async create(createVenuePhotoDto: CreateVenuePhotoDto) {
    const res = await this.venuePhotoRepo.create(createVenuePhotoDto);
    return res;
  }

  async findAll() {
    return await this.venuePhotoRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.venuePhotoRepo.findByPk(id);
  }

  async update(id: number, updateVenuePhotoDto: UpdateVenuePhotoDto) {
    return await this.venuePhotoRepo.update(updateVenuePhotoDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.venuePhotoRepo.destroy({ where: { id } });
    return result;
  }
}
