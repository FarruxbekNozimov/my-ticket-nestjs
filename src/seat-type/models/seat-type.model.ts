import { Seat } from '../../seat/models/seat.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface SeatTypeAttr {
  name:string
	
}

@Table({ tableName: 'seat-type' })
export class SeatType extends Model<SeatType, SeatTypeAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@HasMany(() => Seat)
	seat: Seat[];

	
}
