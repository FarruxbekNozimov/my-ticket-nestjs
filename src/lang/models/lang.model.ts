import { Event } from '../../event/models/event.model';
import { Customer } from '../../customer/models/customer.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface LangAttr {
  name:string
	
}

@Table({ tableName: 'lang' })
export class Lang extends Model<Lang, LangAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@HasMany(() => Event)
	event: Event[];

	@HasMany(() => Customer)
	customer: Customer[];

	
}
