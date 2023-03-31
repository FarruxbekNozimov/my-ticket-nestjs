import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sector } from './models/sector.model';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

@Injectable()
export class SectorService {
  constructor(@InjectModel(Sector) private sectorRepo: typeof Sector) {}

  async create(createSectorDto: CreateSectorDto) {
    const res = await this.sectorRepo.create(createSectorDto);
    return res;
  }

  async findAll() {
    return await this.sectorRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.sectorRepo.findByPk(id);
  }

  async update(id: number, updateSectorDto: UpdateSectorDto) {
    return await this.sectorRepo.update(updateSectorDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.sectorRepo.destroy({ where: { id } });
    return result;
  }
}
