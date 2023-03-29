import { Booking } from '../../booking/models/booking.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface DiscountCouponAttr {
  name:string
	
}

@Table({ tableName: 'discount-coupon' })
export class DiscountCoupon extends Model<DiscountCoupon, DiscountCouponAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@HasMany(() => Booking)
	booking: Booking[];

	
}
