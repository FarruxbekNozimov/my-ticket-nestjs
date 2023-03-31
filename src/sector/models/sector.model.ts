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

interface SectorAttr {
  sector:number
	
}

@Table({ tableName: 'sector' })
export class Sector extends Model<Sector, SectorAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER })
	sector:number;

	@HasMany(() => Seat)
	seat: Seat[];

	
}
