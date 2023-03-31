import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateHumanCategoryDto } from './dto/create-human-category.dto';
import { UpdateHumanCategoryDto } from './dto/update-human-category.dto';
import { HumanCategoryService } from './human-category.service';

@ApiTags('HumanCategory')
@Controller('human-category')
export class HumanCategoryController {
  constructor(private readonly humanCategoryService: HumanCategoryService) {}

  @ApiOperation({ summary: 'Create a humanCategory' })
  @Post()
  create(@Body() createHumanCategoryDto: CreateHumanCategoryDto) {
    return this.humanCategoryService.create(createHumanCategoryDto);
  }

  @ApiOperation({ summary: 'Get all humanCategory' })
  @Get()
  findAll() {
    return this.humanCategoryService.findAll();
  }

  @ApiOperation({ summary: 'Get humanCategory' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.humanCategoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update humanCategory' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateHumanCategoryDto: UpdateHumanCategoryDto,
  ) {
    return await this.humanCategoryService.update(+id, updateHumanCategoryDto);
  }

  @ApiOperation({ summary: 'Delete humanCategory' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.humanCategoryService.delete(id);
  }
}
