import { Event } from '../../event/models/event.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface HumanCategoryAttr {
  name:string
	start_age:number
	finish_age:number
	
}

@Table({ tableName: 'human-category' })
export class HumanCategory extends Model<HumanCategory, HumanCategoryAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@Column({ type: DataType.INTEGER })
	start_age:number;

	@Column({ type: DataType.INTEGER })
	finish_age:number;

	@HasMany(() => Event)
	event: Event[];

	
}
