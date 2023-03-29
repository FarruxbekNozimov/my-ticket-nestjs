import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TicketType } from './models/ticket-type.model';
import { CreateTicketTypeDto } from './dto/create-ticket-type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket-type.dto';

@Injectable()
export class TicketTypeService {
  constructor(@InjectModel(TicketType) private ticketTypeRepo: typeof TicketType) {}

  async create(createTicketTypeDto: CreateTicketTypeDto) {
    const res = await this.ticketTypeRepo.create(createTicketTypeDto);
    return res;
  }

  async findAll() {
    return await this.ticketTypeRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.ticketTypeRepo.findByPk(id);
  }

  async update(id: number, updateTicketTypeDto: UpdateTicketTypeDto) {
    return await this.ticketTypeRepo.update(updateTicketTypeDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.ticketTypeRepo.destroy({ where: { id } });
    return result;
  }
}
