import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from './models/event.model';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event) private eventRepo: typeof Event) {}

  async create(createEventDto: CreateEventDto) {
    const res = await this.eventRepo.create(createEventDto);
    return res;
  }

  async findAll() {
    return await this.eventRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.eventRepo.findByPk(id);
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    return await this.eventRepo.update(updateEventDto, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    const result = await this.eventRepo.destroy({ where: { id } });
    return result;
  }
}
