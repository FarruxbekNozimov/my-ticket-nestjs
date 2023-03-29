import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerCard } from './models/customer-card.model';
import { CreateCustomerCardDto } from './dto/create-customer-card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer-card.dto';

@Injectable()
export class CustomerCardService {
  constructor(@InjectModel(CustomerCard) private customerCardRepo: typeof CustomerCard) {}

  async create(createCustomerCardDto: CreateCustomerCardDto) {
    const res = await this.customerCardRepo.create(createCustomerCardDto);
    return res;
  }

  async findAll() {
    return await this.customerCardRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.customerCardRepo.findByPk(id);
  }

  async update(id: number, updateCustomerCardDto: UpdateCustomerCardDto) {
    return await this.customerCardRepo.update(updateCustomerCardDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.customerCardRepo.destroy({ where: { id } });
    return result;
  }
}
