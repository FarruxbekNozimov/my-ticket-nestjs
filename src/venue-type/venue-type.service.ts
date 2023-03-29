import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VenueType } from './models/venue-type.model';
import { CreateVenueTypeDto } from './dto/create-venue-type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue-type.dto';

@Injectable()
export class VenueTypeService {
  constructor(@InjectModel(VenueType) private venueTypeRepo: typeof VenueType) {}

  async create(createVenueTypeDto: CreateVenueTypeDto) {
    const res = await this.venueTypeRepo.create(createVenueTypeDto);
    return res;
  }

  async findAll() {
    return await this.venueTypeRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.venueTypeRepo.findByPk(id);
  }

  async update(id: number, updateVenueTypeDto: UpdateVenueTypeDto) {
    return await this.venueTypeRepo.update(updateVenueTypeDto, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    const result = await this.venueTypeRepo.destroy({ where: { id } });
    return result;
  }
}
