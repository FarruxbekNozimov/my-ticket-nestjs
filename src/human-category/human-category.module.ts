import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { HumanCategoryController } from './human-category.controller';
import { HumanCategoryService } from './human-category.service';
import { HumanCategory } from './models/human-category.model';

@Module({
  imports: [SequelizeModule.forFeature([HumanCategory]), JwtModule],
  controllers: [HumanCategoryController],
  providers: [HumanCategoryService],
})
export class HumanCategoryModule {}
