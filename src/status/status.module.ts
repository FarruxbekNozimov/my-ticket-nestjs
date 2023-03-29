import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { Status } from './models/status.model';

@Module({
  imports: [SequelizeModule.forFeature([Status]), JwtModule],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
