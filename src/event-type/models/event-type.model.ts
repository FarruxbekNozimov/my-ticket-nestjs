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

interface EventTypeAttr {
  name:string
	parent_event_type_id:number
	
}

@Table({ tableName: 'event-type' })
export class EventType extends Model<EventType, EventTypeAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@ForeignKey(() => EventType)
	@Column({ type: DataType.INTEGER })
	parent_event_type_id: number;
	@BelongsTo(() => EventType)
	event_type: EventType[];

	@HasMany(() => Event)
	event: Event[];

	
}
