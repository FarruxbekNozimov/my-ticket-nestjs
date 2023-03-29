import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private cartRepo: typeof Cart) {}

  async create(createCartDto: CreateCartDto) {
    const res = await this.cartRepo.create(createCartDto);
    return res;
  }

  async findAll() {
    return await this.cartRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.cartRepo.findByPk(id);
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    return await this.cartRepo.update(updateCartDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.cartRepo.destroy({ where: { id } });
    return result;
  }
}
