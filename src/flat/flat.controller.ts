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
import { CreateFlatDto } from './dto/create-flat.dto';
import { UpdateFlatDto } from './dto/update-flat.dto';
import { FlatService } from './flat.service';

@ApiTags('Flat')
@Controller('flat')
export class FlatController {
  constructor(private readonly flatService: FlatService) {}

  @ApiOperation({ summary: 'Create a flat' })
  @Post()
  create(@Body() createFlatDto: CreateFlatDto) {
    return this.flatService.create(createFlatDto);
  }

  @ApiOperation({ summary: 'Get all flat' })
  @Get()
  findAll() {
    return this.flatService.findAll();
  }

  @ApiOperation({ summary: 'Get flat' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.flatService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update flat' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFlatDto: UpdateFlatDto,
  ) {
    return await this.flatService.update(+id, updateFlatDto);
  }

  @ApiOperation({ summary: 'Delete flat' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.flatService.delete(id);
  }
}
