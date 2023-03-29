import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lang } from './models/lang.model';
import { CreateLangDto } from './dto/create-lang.dto';
import { UpdateLangDto } from './dto/update-lang.dto';

@Injectable()
export class LangService {
  constructor(@InjectModel(Lang) private langRepo: typeof Lang) {}

  async create(createLangDto: CreateLangDto) {
    const res = await this.langRepo.create(createLangDto);
    return res;
  }

  async findAll() {
    return await this.langRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.langRepo.findByPk(id);
  }

  async update(id: number, updateLangDto: UpdateLangDto) {
    return await this.langRepo.update(updateLangDto, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    const result = await this.langRepo.destroy({ where: { id } });
    return result;
  }
}
