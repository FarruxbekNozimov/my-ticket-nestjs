import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Ticket } from './models/ticket.model';

@Module({
  imports: [SequelizeModule.forFeature([Ticket]), JwtModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
