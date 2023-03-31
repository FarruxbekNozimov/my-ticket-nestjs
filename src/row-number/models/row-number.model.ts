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

interface RowNumberAttr {
  rowNumber:number
	
}

@Table({ tableName: 'row-number' })
export class RowNumber extends Model<RowNumber, RowNumberAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER })
	rowNumber:number;

	@HasMany(() => Seat)
	seat: Seat[];	
}
