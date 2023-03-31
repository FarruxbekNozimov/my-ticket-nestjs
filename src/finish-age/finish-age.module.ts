import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { FinishAgeController } from './finish-age.controller';
import { FinishAgeService } from './finish-age.service';
import { FinishAge } from './models/finish-age.model';

@Module({
  imports: [SequelizeModule.forFeature([FinishAge]), JwtModule],
  controllers: [FinishAgeController],
  providers: [FinishAgeService],
})
export class FinishAgeModule {}
