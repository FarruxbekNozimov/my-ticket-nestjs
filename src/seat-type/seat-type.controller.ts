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
import { CreateSeatTypeDto } from './dto/create-seat-type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat-type.dto';
import { SeatTypeService } from './seat-type.service';

@ApiTags('SeatType')
@Controller('seat-type')
export class SeatTypeController {
  constructor(private readonly seatTypeService: SeatTypeService) {}

  @ApiOperation({ summary: 'Create a seatType' })
  @Post()
  create(@Body() createSeatTypeDto: CreateSeatTypeDto) {
    return this.seatTypeService.create(createSeatTypeDto);
  }

  @ApiOperation({ summary: 'Get all seatType' })
  @Get()
  findAll() {
    return this.seatTypeService.findAll();
  }

  @ApiOperation({ summary: 'Get seatType' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.seatTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update seatType' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSeatTypeDto: UpdateSeatTypeDto,
  ) {
    return await this.seatTypeService.update(+id, updateSeatTypeDto);
  }

  @ApiOperation({ summary: 'Delete seatType' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.seatTypeService.delete(id);
  }
}
