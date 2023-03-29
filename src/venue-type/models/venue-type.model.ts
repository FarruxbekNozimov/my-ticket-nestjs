import { Venue } from '../../venue/models/venue.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface VenueTypeAttr {
  name:string
	
}

@Table({ tableName: 'venue-type' })
export class VenueType extends Model<VenueType, VenueTypeAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@HasMany(() => Venue)
	venue: Venue[];

	
}
