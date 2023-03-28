import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RegionService } from './example.service';
import { CreateRegionDto } from './dto/create-example.dto';
import { UpdateRegionDto } from './dto/update-example.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { AdminAuthGuard } from '../guards/admin-auth.guards';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'Create a region' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminAuthGuard)
  @Post()
  createComfort(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.createRegion(createRegionDto);
  }

  @ApiOperation({ summary: 'Get all regions' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllComforts() {
    return this.regionService.getAllRegions();
  }

  @ApiOperation({ summary: 'Get region' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getComfortById(@Param('id') id: number) {
    return this.regionService.getRegionById(+id);
  }

  @ApiOperation({ summary: 'Update region' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminAuthGuard)
  @Put(':id')
  async updateComfort(
    @Param('id') id: number,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return await this.regionService.updateRegion(+id, updateRegionDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  async deleteComfort(@Param('id') id: number): Promise<number> {
    return await this.regionService.deleteRegion(id);
  }
}
