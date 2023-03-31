import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer) private customerRepo: typeof Customer) { }

  async create(createCustomerDto: CreateCustomerDto, hashed_password:string) {
    const res = await this.customerRepo.create({...createCustomerDto, hashed_password});
    return res;
  }

  async findAll() {
    return await this.customerRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.customerRepo.findByPk(id);
  }

  async findOneByEmail(email: string) {
    return await this.customerRepo.findOne({ where: { email } });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerRepo.update(updateCustomerDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.customerRepo.destroy({ where: { id } });
    return result;
  }
}
