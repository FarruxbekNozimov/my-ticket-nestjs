import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { FlatController } from './flat.controller';
import { FlatService } from './flat.service';
import { Flat } from './models/flat.model';

@Module({
  imports: [SequelizeModule.forFeature([Flat]), JwtModule],
  controllers: [FlatController],
  providers: [FlatService],
})
export class FlatModule {}
