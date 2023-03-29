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
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { RegionService } from './region.service';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'Create a region' })
  @Post()
  createComfort(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({ summary: 'Get all region' })
  @Get()
  getAllComforts() {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: 'Get region' })
  @Get(':id')
  getComfortById(@Param('id') id: number) {
    return this.regionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update region' })
  @Put(':id')
  async updateComfort(
    @Param('id') id: number,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return await this.regionService.update(+id, updateRegionDto);
  }

  @ApiOperation({ summary: 'Delete region' })
  @Delete(':id')
  async deleteComfort(@Param('id') id: number): Promise<number> {
    return await this.regionService.delete(id);
  }
}
