import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateDiscountCouponDto } from './dto/create-discount-coupon.dto';
import { UpdateDiscountCouponDto } from './dto/update-discount-coupon.dto';
import { DiscountCouponService } from './discount-coupon.service';

@ApiTags('DiscountCoupon')
@Controller('discount-coupon')
export class DiscountCouponController {
  constructor(private readonly discountCouponService: DiscountCouponService) {}

  @ApiOperation({ summary: 'Create a discountCoupon' })
  @Post()
  create(@Body() createDiscountCouponDto: CreateDiscountCouponDto) {
    return this.discountCouponService.create(createDiscountCouponDto);
  }

  @ApiOperation({ summary: 'Get all discountCoupon' })
  @Get()
  findAll() {
    return this.discountCouponService.findAll();
  }

  @ApiOperation({ summary: 'Get discountCoupon' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.discountCouponService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update discountCoupon' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDiscountCouponDto: UpdateDiscountCouponDto,
  ) {
    return await this.discountCouponService.update(+id, updateDiscountCouponDto);
  }

  @ApiOperation({ summary: 'Delete discountCoupon' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.discountCouponService.delete(id);
  }
}
