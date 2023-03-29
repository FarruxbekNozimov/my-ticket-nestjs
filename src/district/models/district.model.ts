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

interface DistrictAttr {
  name:string
	
}

@Table({ tableName: 'district' })
export class District extends Model<District, DistrictAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@HasMany(() => Venue)
	venue: Venue[];

	@HasMany(() => CustomerAddress)
	customer_address: CustomerAddress[];

	
}
