import { Ticket } from '../../ticket/models/ticket.model';
import { Lang } from "../../lang/models/lang.model";
import { Venue } from "../../venue/models/venue.model";
import { HumanCategory } from "../../human-category/models/human-category.model";
import { EventType } from "../../event-type/models/event-type.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface EventAttr {
  name:string
	photo:string
	start_date:Date
	start_time:Date
	finish_date:Date
	finish_time:Date
	info:Date
	event_type_id:number
	human_category_id:number
	venue_id:number
	lang_id:number
	release_date:number
	
}

@Table({ tableName: 'event' })
export class Event extends Model<Event, EventAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@Column({ type: DataType.STRING })
	photo:string;

	@Column({ type: DataType.DATE })
	start_date:Date;

	@Column({ type: DataType.DATE })
	start_time:Date;

	@Column({ type: DataType.DATE })
	finish_date:Date;

	@Column({ type: DataType.DATE })
	finish_time:Date;

	@Column({ type: DataType.DATE })
	info:Date;

	@ForeignKey(() => EventType)
	@Column({ type: DataType.INTEGER })
	event_type_id: number;
	@BelongsTo(() => EventType)
	event_type: EventType[];

	@ForeignKey(() => HumanCategory)
	@Column({ type: DataType.INTEGER })
	human_category_id: number;
	@BelongsTo(() => HumanCategory)
	human_category: HumanCategory[];

	@ForeignKey(() => Venue)
	@Column({ type: DataType.INTEGER })
	venue_id: number;
	@BelongsTo(() => Venue)
	venue: Venue[];

	@ForeignKey(() => Lang)
	@Column({ type: DataType.INTEGER })
	lang_id: number;
	@BelongsTo(() => Lang)
	lang: Lang[];

	@Column({ type: DataType.INTEGER })
	release_date:number;

	@HasMany(() => Ticket)
	ticket: Ticket[];

	
}
