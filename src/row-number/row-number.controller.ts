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
import { CreateRowNumberDto } from './dto/create-row-number.dto';
import { UpdateRowNumberDto } from './dto/update-row-number.dto';
import { RowNumberService } from './row-number.service';

@ApiTags('RowNumber')
@Controller('row-number')
export class RowNumberController {
  constructor(private readonly rowNumberService: RowNumberService) {}

  @ApiOperation({ summary: 'Create a rowNumber' })
  @Post()
  create(@Body() createRowNumberDto: CreateRowNumberDto) {
    return this.rowNumberService.create(createRowNumberDto);
  }

  @ApiOperation({ summary: 'Get all rowNumber' })
  @Get()
  findAll() {
    return this.rowNumberService.findAll();
  }

  @ApiOperation({ summary: 'Get rowNumber' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rowNumberService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update rowNumber' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRowNumberDto: UpdateRowNumberDto,
  ) {
    return await this.rowNumberService.update(+id, updateRowNumberDto);
  }

  @ApiOperation({ summary: 'Delete rowNumber' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.rowNumberService.delete(id);
  }
}
