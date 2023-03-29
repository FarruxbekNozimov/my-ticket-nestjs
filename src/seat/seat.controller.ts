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
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { SeatService } from './seat.service';

@ApiTags('Seat')
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @ApiOperation({ summary: 'Create a seat' })
  @Post()
  createComfort(@Body() createSeatDto: CreateSeatDto) {
    return this.seatService.create(createSeatDto);
  }

  @ApiOperation({ summary: 'Get all seat' })
  @Get()
  getAllComforts() {
    return this.seatService.findAll();
  }

  @ApiOperation({ summary: 'Get seat' })
  @Get(':id')
  getComfortById(@Param('id') id: number) {
    return this.seatService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update seat' })
  @Put(':id')
  async updateComfort(
    @Param('id') id: number,
    @Body() updateSeatDto: UpdateSeatDto,
  ) {
    return await this.seatService.update(+id, updateSeatDto);
  }

  @ApiOperation({ summary: 'Delete seat' })
  @Delete(':id')
  async deleteComfort(@Param('id') id: number): Promise<number> {
    return await this.seatService.delete(id);
  }
}
