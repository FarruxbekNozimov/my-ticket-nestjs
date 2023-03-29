import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeliveryMethod } from './models/delivery-method.model';
import { CreateDeliveryMethodDto } from './dto/create-delivery-method.dto';
import { UpdateDeliveryMethodDto } from './dto/update-delivery-method.dto';

@Injectable()
export class DeliveryMethodService {
  constructor(@InjectModel(DeliveryMethod) private deliveryMethodRepo: typeof DeliveryMethod) {}

  async create(createDeliveryMethodDto: CreateDeliveryMethodDto) {
    const res = await this.deliveryMethodRepo.create(createDeliveryMethodDto);
    return res;
  }

  async findAll() {
    return await this.deliveryMethodRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.deliveryMethodRepo.findByPk(id);
  }

  async update(id: number, updateDeliveryMethodDto: UpdateDeliveryMethodDto) {
    return await this.deliveryMethodRepo.update(updateDeliveryMethodDto, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    const result = await this.deliveryMethodRepo.destroy({ where: { id } });
    return result;
  }
}
