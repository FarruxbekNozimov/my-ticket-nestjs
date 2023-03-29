import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { DeliveryMethodController } from './delivery-method.controller';
import { DeliveryMethodService } from './delivery-method.service';
import { DeliveryMethod } from './models/delivery-method.model';

@Module({
  imports: [SequelizeModule.forFeature([DeliveryMethod]), JwtModule],
  controllers: [DeliveryMethodController],
  providers: [DeliveryMethodService],
})
export class DeliveryMethodModule {}
