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
import { CreateStartAgeDto } from './dto/create-start-age.dto';
import { UpdateStartAgeDto } from './dto/update-start-age.dto';
import { StartAgeService } from './start-age.service';

@ApiTags('StartAge')
@Controller('start-age')
export class StartAgeController {
  constructor(private readonly startAgeService: StartAgeService) {}

  @ApiOperation({ summary: 'Create a startAge' })
  @Post()
  create(@Body() createStartAgeDto: CreateStartAgeDto) {
    return this.startAgeService.create(createStartAgeDto);
  }

  @ApiOperation({ summary: 'Get all startAge' })
  @Get()
  findAll() {
    return this.startAgeService.findAll();
  }

  @ApiOperation({ summary: 'Get startAge' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.startAgeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update startAge' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStartAgeDto: UpdateStartAgeDto,
  ) {
    return await this.startAgeService.update(+id, updateStartAgeDto);
  }

  @ApiOperation({ summary: 'Delete startAge' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.startAgeService.delete(id);
  }
}
