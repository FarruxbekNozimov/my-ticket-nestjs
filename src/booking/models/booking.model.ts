import { Status } from "../../status/models/status.model";
import { DiscountCoupon } from "../../discount-coupon/models/discount-coupon.model";
import { DeliveryMethod } from "../../delivery-method/models/delivery-method.model";
import { PaymentMethod } from "../../payment-method/models/payment-method.model";
import { Cart } from "../../cart/models/cart.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface BookingAttr {
  cart_id:number
	payment_method_id:number
	delivery_method_id:number
	discount_coupon_id:number
	status_id:number
	
}

@Table({ tableName: 'booking' })
export class Booking extends Model<Booking, BookingAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Cart)
	@Column({ type: DataType.INTEGER })
	cart_id: number;
	@BelongsTo(() => Cart)
	cart: Cart[];

	@ForeignKey(() => PaymentMethod)
	@Column({ type: DataType.INTEGER })
	payment_method_id: number;
	@BelongsTo(() => PaymentMethod)
	payment_method: PaymentMethod[];

	@ForeignKey(() => DeliveryMethod)
	@Column({ type: DataType.INTEGER })
	delivery_method_id: number;
	@BelongsTo(() => DeliveryMethod)
	delivery_method: DeliveryMethod[];

	@ForeignKey(() => DiscountCoupon)
	@Column({ type: DataType.INTEGER })
	discount_coupon_id: number;
	@BelongsTo(() => DiscountCoupon)
	discount_coupon: DiscountCoupon[];

	@ForeignKey(() => Status)
	@Column({ type: DataType.INTEGER })
	status_id: number;
	@BelongsTo(() => Status)
	status: Status[];

	
}
