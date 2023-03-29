import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DiscountCoupon } from './models/discount-coupon.model';
import { CreateDiscountCouponDto } from './dto/create-discount-coupon.dto';
import { UpdateDiscountCouponDto } from './dto/update-discount-coupon.dto';

@Injectable()
export class DiscountCouponService {
  constructor(@InjectModel(DiscountCoupon) private discountCouponRepo: typeof DiscountCoupon) {}

  async create(createDiscountCouponDto: CreateDiscountCouponDto) {
    const res = await this.discountCouponRepo.create(createDiscountCouponDto);
    return res;
  }

  async findAll() {
    return await this.discountCouponRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.discountCouponRepo.findByPk(id);
  }

  async update(id: number, updateDiscountCouponDto: UpdateDiscountCouponDto) {
    return await this.discountCouponRepo.update(updateDiscountCouponDto, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    const result = await this.discountCouponRepo.destroy({ where: { id } });
    return result;
  }
}
