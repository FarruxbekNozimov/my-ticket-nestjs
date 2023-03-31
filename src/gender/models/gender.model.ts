import { Customer } from '../../customer/models/customer.model';
import { HumanCategory } from '../../human-category/models/human-category.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface GenderAttr {
  name:string
	
}

@Table({ tableName: 'gender' })
export class Gender extends Model<Gender, GenderAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@HasMany(() => Customer)
	customer: Customer[];

	@HasMany(() => HumanCategory)
	human_category: HumanCategory[];

	
}
