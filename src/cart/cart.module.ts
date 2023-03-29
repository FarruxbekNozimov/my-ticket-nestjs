import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './models/cart.model';

@Module({
  imports: [SequelizeModule.forFeature([Cart]), JwtModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
