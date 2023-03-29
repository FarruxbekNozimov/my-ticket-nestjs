import { Booking } from '../../booking/models/booking.model';
import { Ticket } from '../../ticket/models/ticket.model';
import { Cart } from '../../cart/models/cart.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface StatusAttr {
  name:string
	
}

@Table({ tableName: 'status' })
export class Status extends Model<Status, StatusAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@HasMany(() => Booking)
	booking: Booking[];

	@HasMany(() => Ticket)
	ticket: Ticket[];

	@HasMany(() => Cart)
	cart: Cart[];

	
}
