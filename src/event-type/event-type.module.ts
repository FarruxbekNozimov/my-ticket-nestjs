import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { EventTypeController } from './event-type.controller';
import { EventTypeService } from './event-type.service';
import { EventType } from './models/event-type.model';

@Module({
  imports: [SequelizeModule.forFeature([EventType]), JwtModule],
  controllers: [EventTypeController],
  providers: [EventTypeService],
})
export class EventTypeModule {}
