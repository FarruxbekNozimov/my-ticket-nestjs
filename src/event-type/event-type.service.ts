import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EventType } from './models/event-type.model';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';

@Injectable()
export class EventTypeService {
  constructor(@InjectModel(EventType) private eventTypeRepo: typeof EventType) {}

  async create(createEventTypeDto: CreateEventTypeDto) {
    const res = await this.eventTypeRepo.create(createEventTypeDto);
    return res;
  }

  async findAll() {
    return await this.eventTypeRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.eventTypeRepo.findByPk(id);
  }

  async update(id: number, updateEventTypeDto: UpdateEventTypeDto) {
    return await this.eventTypeRepo.update(updateEventTypeDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.eventTypeRepo.destroy({ where: { id } });
    return result;
  }
}
