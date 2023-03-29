import { VenuePhoto } from '../../venue-photo/models/venue-photo.model';
import { Seat } from '../../seat/models/seat.model';
import { Event } from '../../event/models/event.model';
import { District } from "../../district/models/district.model";
import { Region } from "../../region/models/region.model";
import { VenueType } from "../../venue-type/models/venue-type.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface VenueAttr {
  name:string
	address:string
	location:string
	site:string
	phone:string
	venue_type_id:number
	schema:string
	region_id:number
	district_id:number
	
}

@Table({ tableName: 'venue' })
export class Venue extends Model<Venue, VenueAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@Column({ type: DataType.STRING })
	address:string;

	@Column({ type: DataType.STRING })
	location:string;

	@Column({ type: DataType.STRING })
	site:string;

	@Column({ type: DataType.STRING })
	phone:string;

	@ForeignKey(() => VenueType)
	@Column({ type: DataType.INTEGER })
	venue_type_id: number;
	@BelongsTo(() => VenueType)
	venue_type: VenueType[];

	@Column({ type: DataType.STRING })
	schema:string;

	@ForeignKey(() => Region)
	@Column({ type: DataType.INTEGER })
	region_id: number;
	@BelongsTo(() => Region)
	region: Region[];

	@ForeignKey(() => District)
	@Column({ type: DataType.INTEGER })
	district_id: number;
	@BelongsTo(() => District)
	district: District[];

	@HasMany(() => VenuePhoto)
	venue_photo: VenuePhoto[];

	@HasMany(() => Seat)
	seat: Seat[];

	@HasMany(() => Event)
	event: Event[];

	
}
