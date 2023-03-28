import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer) private customerRepo: typeof Customer) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return await this.customerRepo.create(createCustomerDto);
  }

  async getAll() {
    return await this.customerRepo.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    const Customer = await this.customerRepo.findOne(id);
    return Customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const Customer = await this.customerRepo.update(updateCustomerDto, {
      where: { id },
    });
    return Customer;
  }

  async delete(id: number): Promise<number> {
    const result = await this.customerRepo.destroy({ where: { id } });
    return result;
  }
}
