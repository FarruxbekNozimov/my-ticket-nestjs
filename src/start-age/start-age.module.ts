import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { StartAgeController } from './start-age.controller';
import { StartAgeService } from './start-age.service';
import { StartAge } from './models/start-age.model';

@Module({
  imports: [SequelizeModule.forFeature([StartAge]), JwtModule],
  controllers: [StartAgeController],
  providers: [StartAgeService],
})
export class StartAgeModule {}
