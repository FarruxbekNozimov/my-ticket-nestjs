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
import { CreateVenuePhotoDto } from './dto/create-venue-photo.dto';
import { UpdateVenuePhotoDto } from './dto/update-venue-photo.dto';
import { VenuePhotoService } from './venue-photo.service';

@ApiTags('VenuePhoto')
@Controller('venue-photo')
export class VenuePhotoController {
  constructor(private readonly venuePhotoService: VenuePhotoService) {}

  @ApiOperation({ summary: 'Create a venuePhoto' })
  @Post()
  create(@Body() createVenuePhotoDto: CreateVenuePhotoDto) {
    return this.venuePhotoService.create(createVenuePhotoDto);
  }

  @ApiOperation({ summary: 'Get all venuePhoto' })
  @Get()
  findAll() {
    return this.venuePhotoService.findAll();
  }

  @ApiOperation({ summary: 'Get venuePhoto' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.venuePhotoService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update venuePhoto' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVenuePhotoDto: UpdateVenuePhotoDto,
  ) {
    return await this.venuePhotoService.update(+id, updateVenuePhotoDto);
  }

  @ApiOperation({ summary: 'Delete venuePhoto' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.venuePhotoService.delete(id);
  }
}
