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
import { CreateVenueTypeDto } from './dto/create-venue-type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue-type.dto';
import { VenueTypeService } from './venue-type.service';

@ApiTags('VenueType')
@Controller('venue-type')
export class VenueTypeController {
  constructor(private readonly venueTypeService: VenueTypeService) {}

  @ApiOperation({ summary: 'Create a venueType' })
  @Post()
  create(@Body() createVenueTypeDto: CreateVenueTypeDto) {
    return this.venueTypeService.create(createVenueTypeDto);
  }

  @ApiOperation({ summary: 'Get all venueType' })
  @Get()
  findAll() {
    return this.venueTypeService.findAll();
  }

  @ApiOperation({ summary: 'Get venueType' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.venueTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update venueType' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVenueTypeDto: UpdateVenueTypeDto,
  ) {
    return await this.venueTypeService.update(+id, updateVenueTypeDto);
  }

  @ApiOperation({ summary: 'Delete venueType' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.venueTypeService.delete(id);
  }
}
