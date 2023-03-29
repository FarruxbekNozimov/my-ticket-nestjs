import { Cart } from '../../cart/models/cart.model';
import { Status } from "../../status/models/status.model";
import { Seat } from "../../seat/models/seat.model";
import { Event } from "../../event/models/event.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface TicketAttr {
  event_id:number
	seat_id:number
	price:number
	service_free:number
	status_id:number
	ticket_type:number
	
}

@Table({ tableName: 'ticket' })
export class Ticket extends Model<Ticket, TicketAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Event)
	@Column({ type: DataType.INTEGER })
	event_id: number;
	@BelongsTo(() => Event)
	event: Event[];

	@ForeignKey(() => Seat)
	@Column({ type: DataType.INTEGER })
	seat_id: number;
	@BelongsTo(() => Seat)
	seat: Seat[];

	@Column({ type: DataType.INTEGER })
	price:number;

	@Column({ type: DataType.INTEGER })
	service_free:number;

	@ForeignKey(() => Status)
	@Column({ type: DataType.INTEGER })
	status_id: number;
	@BelongsTo(() => Status)
	status: Status[];

	@Column({ type: DataType.INTEGER })
	ticket_type:number;

	@HasMany(() => Cart)
	cart: Cart[];

	
}
