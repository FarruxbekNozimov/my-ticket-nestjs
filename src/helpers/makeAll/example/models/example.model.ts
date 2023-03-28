import { Column, Model, Table } from 'sequelize-typescript';

interface ExampleAttr {
  name: string;
}

@Table({ tableName: 'examples' })
export class Example extends Model<Example, ExampleAttr> {
  //Column
}
