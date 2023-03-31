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
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { VenueService } from './venue.service';

@ApiTags('Venue')
@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @ApiOperation({ summary: 'Create a venue' })
  @Post()
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.create(createVenueDto);
  }

  @ApiOperation({ summary: 'Get all venue' })
  @Get()
  findAll() {
    return this.venueService.findAll();
  }

  @ApiOperation({ summary: 'Get venue' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.venueService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update venue' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVenueDto: UpdateVenueDto,
  ) {
    return await this.venueService.update(+id, updateVenueDto);
  }

  @ApiOperation({ summary: 'Delete venue' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.venueService.delete(id);
  }
}
