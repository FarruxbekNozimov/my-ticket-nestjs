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

interface DeliveryMethodAttr {
  name:string
	
}

@Table({ tableName: 'delivery-method' })
export class DeliveryMethod extends Model<DeliveryMethod, DeliveryMethodAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@HasMany(() => Booking)
	booking: Booking[];

	
}
