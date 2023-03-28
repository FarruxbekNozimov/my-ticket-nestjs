import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateExampleDto } from './dto/create-example.dto';
import { Example } from './models/example.model';
import { UpdateExampleDto } from './dto/update-example.dto';

@Injectable()
export class ExampleService {
  constructor(@InjectModel(Example) private exampleRepo: typeof Example) {}

  async createExample(createExampleDto: CreateExampleDto) {
    const newExample = await this.exampleRepo.create(createExampleDto);
    return newExample;
  }

  async getAllExamples() {
    const Example = await this.exampleRepo.findAll({ include: { all: true } });
    return Example.sort((a, b) => a.id - b.id);
  }

  async getExampleById(id: number) {
    const Example = await this.exampleRepo.findByPk(id);
    return Example;
  }

  async updateExample(id: number, updateExampleDto: UpdateExampleDto) {
    const Example = await this.exampleRepo.update(updateExampleDto, {
      where: { id },
    });
    return Example;
  }

  async deleteExample(id: number): Promise<number> {
    const result = await this.exampleRepo.destroy({ where: { id } });
    return result;
  }
}
