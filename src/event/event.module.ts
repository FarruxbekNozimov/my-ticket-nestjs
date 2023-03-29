import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event } from './models/event.model';

@Module({
  imports: [SequelizeModule.forFeature([Event]), JwtModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
