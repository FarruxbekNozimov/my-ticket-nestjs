import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { CustomerCardController } from './customer-card.controller';
import { CustomerCardService } from './customer-card.service';
import { CustomerCard } from './models/customer-card.model';

@Module({
  imports: [SequelizeModule.forFeature([CustomerCard]), JwtModule],
  controllers: [CustomerCardController],
  providers: [CustomerCardService],
})
export class CustomerCardModule {}
