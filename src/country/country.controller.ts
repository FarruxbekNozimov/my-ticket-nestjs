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
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountryService } from './country.service';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiOperation({ summary: 'Create a country' })
  @Post()
  createComfort(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.create(createCountryDto);
  }

  @ApiOperation({ summary: 'Get all country' })
  @Get()
  getAllComforts() {
    return this.countryService.findAll();
  }

  @ApiOperation({ summary: 'Get country' })
  @Get(':id')
  getComfortById(@Param('id') id: number) {
    return this.countryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update country' })
  @Put(':id')
  async updateComfort(
    @Param('id') id: number,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return await this.countryService.update(+id, updateCountryDto);
  }

  @ApiOperation({ summary: 'Delete country' })
  @Delete(':id')
  async deleteComfort(@Param('id') id: number): Promise<number> {
    return await this.countryService.delete(id);
  }
}
