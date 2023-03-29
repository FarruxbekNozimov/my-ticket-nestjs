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
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { ExampleService } from './example.service';

@ApiTags('Example')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @ApiOperation({ summary: 'Create a example' })
  @Post()
  createComfort(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.create(createExampleDto);
  }

  @ApiOperation({ summary: 'Get all example' })
  @Get()
  getAllComforts() {
    return this.exampleService.findAll();
  }

  @ApiOperation({ summary: 'Get example' })
  @Get(':id')
  getComfortById(@Param('id') id: number) {
    return this.exampleService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update example' })
  @Put(':id')
  async updateComfort(
    @Param('id') id: number,
    @Body() updateExampleDto: UpdateExampleDto,
  ) {
    return await this.exampleService.update(+id, updateExampleDto);
  }

  @ApiOperation({ summary: 'Delete example' })
  @Delete(':id')
  async deleteComfort(@Param('id') id: number): Promise<number> {
    return await this.exampleService.delete(id);
  }
}
