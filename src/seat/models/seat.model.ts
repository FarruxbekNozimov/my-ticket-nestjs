import { Ticket } from '../../ticket/models/ticket.model';
import { SeatType } from "../../seat-type/models/seat-type.model";
import { Venue } from "../../venue/models/venue.model";
import { RowNumber } from "../../row-number/models/row-number.model";
import { Sector } from "../../sector/models/sector.model";
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
  sector_id:number
	row_number_id:number
	venue_id:number
	seat_type_id:number
	location_in_schema:string
	
}

@Table({ tableName: 'seat' })
export class Seat extends Model<Seat, SeatAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Sector)
	@Column({ type: DataType.INTEGER })
	sector_id: number;
	@BelongsTo(() => Sector)
	sector: Sector[];

	@ForeignKey(() => RowNumber)
	@Column({ type: DataType.INTEGER })
	row_number_id: number;
	@BelongsTo(() => RowNumber)
	row_number: RowNumber[];

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
