import { Venue } from '../../venue/models/venue.model';
import { CustomerAddress } from '../../customer-address/models/customer-address.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface RegionAttr {
  name:string
	
}

@Table({ tableName: 'region' })
export class Region extends Model<Region, RegionAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@HasMany(() => Venue)
	venue: Venue[];

	@HasMany(() => CustomerAddress)
	customer_address: CustomerAddress[];

	
}
