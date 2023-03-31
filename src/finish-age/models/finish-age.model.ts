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

interface FinishAgeAttr {
  number:number
	
}

@Table({ tableName: 'finish-age' })
export class FinishAge extends Model<FinishAge, FinishAgeAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER })
	number:number;

	@HasMany(() => HumanCategory)
	human_category: HumanCategory[];

	
}
