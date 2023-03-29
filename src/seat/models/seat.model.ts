import { Ticket } from '../../ticket/models/ticket.model';
import { SeatType } from "../../seat-type/models/seat-type.model";
import { Venue } from "../../venue/models/venue.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface SeatAttr {
  sector:number
	row_number:number
	venue_id:number
	seat_type_id:number
	location_in_schema:string
	
}

@Table({ tableName: 'seat' })
export class Seat extends Model<Seat, SeatAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER })
	sector:number;

	@Column({ type: DataType.INTEGER })
	row_number:number;

	@ForeignKey(() => Venue)
	@Column({ type: DataType.INTEGER })
	venue_id: number;
	@BelongsTo(() => Venue)
	venue: Venue[];

	@ForeignKey(() => SeatType)
	@Column({ type: DataType.INTEGER })
	seat_type_id: number;
	@BelongsTo(() => SeatType)
	seat_type: SeatType[];

	@Column({ type: DataType.STRING })
	location_in_schema:string;

	@HasMany(() => Ticket)
	ticket: Ticket[];

	
}
