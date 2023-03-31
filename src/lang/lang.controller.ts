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
import { CreateLangDto } from './dto/create-lang.dto';
import { UpdateLangDto } from './dto/update-lang.dto';
import { LangService } from './lang.service';

@ApiTags('Lang')
@Controller('lang')
export class LangController {
  constructor(private readonly langService: LangService) {}

  @ApiOperation({ summary: 'Create a lang' })
  @Post()
  create(@Body() createLangDto: CreateLangDto) {
    return this.langService.create(createLangDto);
  }

  @ApiOperation({ summary: 'Get all lang' })
  @Get()
  findAll() {
    return this.langService.findAll();
  }

  @ApiOperation({ summary: 'Get lang' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.langService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update lang' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLangDto: UpdateLangDto,
  ) {
    return await this.langService.update(+id, updateLangDto);
  }

  @ApiOperation({ summary: 'Delete lang' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.langService.delete(id);
  }
}
