import { CustomerCard } from '../../customer-card/models/customer-card.model';
import { CustomerAddress } from '../../customer-address/models/customer-address.model';
import { Cart } from '../../cart/models/cart.model';
import { Lang } from "../../lang/models/lang.model";
import { Gender } from "../../gender/models/gender.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface CustomerAttr {
  name:string
	first_name:string
	last_name:string
	phone:string
	hashed_password:string
	email:string
	birth_date:string
	gender_id:number
	lang_id:number
	hashed_refresh_token:string
	
}

@Table({ tableName: 'customer' })
export class Customer extends Model<Customer, CustomerAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@Column({ type: DataType.STRING })
	first_name:string;

	@Column({ type: DataType.STRING })
	last_name:string;

	@Column({ type: DataType.STRING })
	phone:string;

	@Column({ type: DataType.STRING })
	hashed_password:string;

	@Column({ type: DataType.STRING })
	email:string;

	@Column({ type: DataType.STRING })
	birth_date:string;

	@ForeignKey(() => Gender)
	@Column({ type: DataType.INTEGER })
	gender_id: number;
	@BelongsTo(() => Gender)
	gender: Gender[];

	@ForeignKey(() => Lang)
	@Column({ type: DataType.INTEGER })
	lang_id: number;
	@BelongsTo(() => Lang)
	lang: Lang[];

	@Column({ type: DataType.STRING })
	hashed_refresh_token:string;

	@HasMany(() => CustomerCard)
	customer_card: CustomerCard[];

	@HasMany(() => CustomerAddress)
	customer_address: CustomerAddress[];

	@HasMany(() => Cart)
	cart: Cart[];

	
}
