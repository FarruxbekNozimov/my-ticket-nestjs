import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerAddress } from './models/customer-address.model';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';

@Injectable()
export class CustomerAddressService {
  constructor(@InjectModel(CustomerAddress) private customerAddressRepo: typeof CustomerAddress) {}

  async create(createCustomerAddressDto: CreateCustomerAddressDto) {
    const res = await this.customerAddressRepo.create(createCustomerAddressDto);
    return res;
  }

  async findAll() {
    return await this.customerAddressRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.customerAddressRepo.findByPk(id);
  }

  async update(id: number, updateCustomerAddressDto: UpdateCustomerAddressDto) {
    return await this.customerAddressRepo.update(updateCustomerAddressDto, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    const result = await this.customerAddressRepo.destroy({ where: { id } });
    return result;
  }
}
