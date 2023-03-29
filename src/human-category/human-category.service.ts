import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HumanCategory } from './models/human-category.model';
import { CreateHumanCategoryDto } from './dto/create-human-category.dto';
import { UpdateHumanCategoryDto } from './dto/update-human-category.dto';

@Injectable()
export class HumanCategoryService {
  constructor(@InjectModel(HumanCategory) private humanCategoryRepo: typeof HumanCategory) {}

  async create(createHumanCategoryDto: CreateHumanCategoryDto) {
    const res = await this.humanCategoryRepo.create(createHumanCategoryDto);
    return res;
  }

  async findAll() {
    return await this.humanCategoryRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.humanCategoryRepo.findByPk(id);
  }

  async update(id: number, updateHumanCategoryDto: UpdateHumanCategoryDto) {
    return await this.humanCategoryRepo.update(updateHumanCategoryDto, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    const result = await this.humanCategoryRepo.destroy({ where: { id } });
    return result;
  }
}
