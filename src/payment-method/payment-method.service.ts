import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentMethod } from './models/payment-method.model';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(@InjectModel(PaymentMethod) private paymentMethodRepo: typeof PaymentMethod) {}

  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    const res = await this.paymentMethodRepo.create(createPaymentMethodDto);
    return res;
  }

  async findAll() {
    return await this.paymentMethodRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.paymentMethodRepo.findByPk(id);
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return await this.paymentMethodRepo.update(updatePaymentMethodDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.paymentMethodRepo.destroy({ where: { id } });
    return result;
  }
}
