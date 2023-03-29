import { Ticket } from '../../ticket/models/ticket.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface TicketTypeAttr {
  name:string
	color:string
	
}

@Table({ tableName: 'ticket-type' })
export class TicketType extends Model<TicketType, TicketTypeAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@Column({ type: DataType.STRING })
	color:string;

	@HasMany(() => Ticket)
	ticket: Ticket[];

	
}
