import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { RowNumberController } from './row-number.controller';
import { RowNumberService } from './row-number.service';
import { RowNumber } from './models/row-number.model';

@Module({
  imports: [SequelizeModule.forFeature([RowNumber]), JwtModule],
  controllers: [RowNumberController],
  providers: [RowNumberService],
})
export class RowNumberModule {}
