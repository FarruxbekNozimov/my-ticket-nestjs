import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { DiscountCouponController } from './discount-coupon.controller';
import { DiscountCouponService } from './discount-coupon.service';
import { DiscountCoupon } from './models/discount-coupon.model';

@Module({
  imports: [SequelizeModule.forFeature([DiscountCoupon]), JwtModule],
  controllers: [DiscountCouponController],
  providers: [DiscountCouponService],
})
export class DiscountCouponModule {}
