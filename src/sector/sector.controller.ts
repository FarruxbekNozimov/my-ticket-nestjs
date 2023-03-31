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
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { SectorService } from './sector.service';

@ApiTags('Sector')
@Controller('sector')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @ApiOperation({ summary: 'Create a sector' })
  @Post()
  create(@Body() createSectorDto: CreateSectorDto) {
    return this.sectorService.create(createSectorDto);
  }

  @ApiOperation({ summary: 'Get all sector' })
  @Get()
  findAll() {
    return this.sectorService.findAll();
  }

  @ApiOperation({ summary: 'Get sector' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sectorService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update sector' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSectorDto: UpdateSectorDto,
  ) {
    return await this.sectorService.update(+id, updateSectorDto);
  }

  @ApiOperation({ summary: 'Delete sector' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.sectorService.delete(id);
  }
}
