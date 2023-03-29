import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ticket } from './models/ticket.model';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket) private ticketRepo: typeof Ticket) {}

  async create(createTicketDto: CreateTicketDto) {
    const res = await this.ticketRepo.create(createTicketDto);
    return res;
  }

  async findAll() {
    return await this.ticketRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.ticketRepo.findByPk(id);
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    return await this.ticketRepo.update(updateTicketDto, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    const result = await this.ticketRepo.destroy({ where: { id } });
    return result;
  }
}
