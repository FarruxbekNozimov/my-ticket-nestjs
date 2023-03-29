import { Booking } from '../../booking/models/booking.model';
import { Status } from "../../status/models/status.model";
import { Customer } from "../../customer/models/customer.model";
import { Ticket } from "../../ticket/models/ticket.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface CartAttr {
  ticket_id:number
	customer_id:number
	status_id:number
	
}

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart, CartAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Ticket)
	@Column({ type: DataType.INTEGER })
	ticket_id: number;
	@BelongsTo(() => Ticket)
	ticket: Ticket[];

	@ForeignKey(() => Customer)
	@Column({ type: DataType.INTEGER })
	customer_id: number;
	@BelongsTo(() => Customer)
	customer: Customer[];

	@ForeignKey(() => Status)
	@Column({ type: DataType.INTEGER })
	status_id: number;
	@BelongsTo(() => Status)
	status: Status[];

	@HasMany(() => Booking)
	booking: Booking[];

	
}
