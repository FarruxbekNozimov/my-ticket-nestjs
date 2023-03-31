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

interface FlatAttr {
  quarter:number
	number:number
	floor:number
	
}

@Table({ tableName: 'flat' })
export class Flat extends Model<Flat, FlatAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER })
	quarter:number;

	@Column({ type: DataType.INTEGER })
	number:number;

	@Column({ type: DataType.INTEGER })
	floor:number;

	@HasMany(() => CustomerAddress)
	customer_address: CustomerAddress[];

	
}
