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

interface VenuePhotoAttr {
  venue_id:number
	url:string
	
}

@Table({ tableName: 'venue-photo' })
export class VenuePhoto extends Model<VenuePhoto, VenuePhotoAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Venue)
	@Column({ type: DataType.INTEGER })
	venue_id: number;
	@BelongsTo(() => Venue)
	venue: Venue[];

	@Column({ type: DataType.STRING })
	url:string;

	
}
