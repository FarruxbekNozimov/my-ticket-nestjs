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

interface StartAgeAttr {
  number:number
	
}

@Table({ tableName: 'start-age' })
export class StartAge extends Model<StartAge, StartAgeAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER })
	number:number;

	@HasMany(() => HumanCategory)
	human_category: HumanCategory[];

	
}
