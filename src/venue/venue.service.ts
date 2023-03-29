import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Venue } from './models/venue.model';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';

@Injectable()
export class VenueService {
  constructor(@InjectModel(Venue) private venueRepo: typeof Venue) {}

  async create(createVenueDto: CreateVenueDto) {
    const res = await this.venueRepo.create(createVenueDto);
    return res;
  }

  async findAll() {
    return await this.venueRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.venueRepo.findByPk(id);
  }

  async update(id: number, updateVenueDto: UpdateVenueDto) {
    return await this.venueRepo.update(updateVenueDto, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    const result = await this.venueRepo.destroy({ where: { id } });
    return result;
  }
}
