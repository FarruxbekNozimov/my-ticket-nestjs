import { Event } from '../../event/models/event.model';
import { Gender } from '../../gender/models/gender.model';
import { FinishAge } from '../../finish-age/models/finish-age.model';
import { StartAge } from '../../start-age/models/start-age.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface HumanCategoryAttr {
  name: string;
  start_age_id: number;
  finish_age_id: number;
  gender_id: number;
}

@Table({ tableName: 'human-category' })
export class HumanCategory extends Model<HumanCategory, HumanCategoryAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @ForeignKey(() => StartAge)
  @Column({ type: DataType.INTEGER })
  start_age_id: number;
  @BelongsTo(() => StartAge)
  start_age: StartAge[];

  @ForeignKey(() => FinishAge)
  @Column({ type: DataType.INTEGER })
  finish_age_id: number;
  @BelongsTo(() => FinishAge)
  finish_age: FinishAge[];

  @ForeignKey(() => Gender)
  @Column({ type: DataType.INTEGER })
  gender_id: number;
  @BelongsTo(() => Gender)
  gender: Gender[];

  @HasMany(() => Event)
  event: Event[];
}
