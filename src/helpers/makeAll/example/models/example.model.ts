import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface ExampleAttr {
  'attr'
}

@Table({ tableName: 'example' })
export class Example extends Model<Example, ExampleAttr> {
  'column'
}
