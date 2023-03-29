import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { CustomerAddressController } from './customer-address.controller';
import { CustomerAddressService } from './customer-address.service';
import { CustomerAddress } from './models/customer-address.model';

@Module({
  imports: [SequelizeModule.forFeature([CustomerAddress]), JwtModule],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
})
export class CustomerAddressModule {}
