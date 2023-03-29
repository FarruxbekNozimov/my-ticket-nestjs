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
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { DistrictService } from './district.service';

@ApiTags('District')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: 'Create a district' })
  @Post()
  createComfort(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({ summary: 'Get all district' })
  @Get()
  getAllComforts() {
    return this.districtService.findAll();
  }

  @ApiOperation({ summary: 'Get district' })
  @Get(':id')
  getComfortById(@Param('id') id: number) {
    return this.districtService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update district' })
  @Put(':id')
  async updateComfort(
    @Param('id') id: number,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return await this.districtService.update(+id, updateDistrictDto);
  }

  @ApiOperation({ summary: 'Delete district' })
  @Delete(':id')
  async deleteComfort(@Param('id') id: number): Promise<number> {
    return await this.districtService.delete(id);
  }
}
