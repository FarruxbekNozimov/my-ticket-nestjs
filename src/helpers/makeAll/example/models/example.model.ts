import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface ExampleAttr {
  'attr'
}

@Table
export class Example extends Model<Example, ExampleAttr> {
  'column'
}
