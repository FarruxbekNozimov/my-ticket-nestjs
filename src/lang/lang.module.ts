import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { LangController } from './lang.controller';
import { LangService } from './lang.service';
import { Lang } from './models/lang.model';

@Module({
  imports: [SequelizeModule.forFeature([Lang]), JwtModule],
  controllers: [LangController],
  providers: [LangService],
})
export class LangModule {}
