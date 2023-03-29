import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { TicketTypeController } from './ticket-type.controller';
import { TicketTypeService } from './ticket-type.service';
import { TicketType } from './models/ticket-type.model';

@Module({
  imports: [SequelizeModule.forFeature([TicketType]), JwtModule],
  controllers: [TicketTypeController],
  providers: [TicketTypeService],
})
export class TicketTypeModule {}
