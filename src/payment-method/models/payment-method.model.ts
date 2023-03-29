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

interface PaymentMethodAttr {
  name:string
	
}

@Table({ tableName: 'payment-method' })
export class PaymentMethod extends Model<PaymentMethod, PaymentMethodAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@HasMany(() => Booking)
	booking: Booking[];

	
}
