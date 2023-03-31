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
import { CreateFinishAgeDto } from './dto/create-finish-age.dto';
import { UpdateFinishAgeDto } from './dto/update-finish-age.dto';
import { FinishAgeService } from './finish-age.service';

@ApiTags('FinishAge')
@Controller('finish-age')
export class FinishAgeController {
  constructor(private readonly finishAgeService: FinishAgeService) {}

  @ApiOperation({ summary: 'Create a finishAge' })
  @Post()
  create(@Body() createFinishAgeDto: CreateFinishAgeDto) {
    return this.finishAgeService.create(createFinishAgeDto);
  }

  @ApiOperation({ summary: 'Get all finishAge' })
  @Get()
  findAll() {
    return this.finishAgeService.findAll();
  }

  @ApiOperation({ summary: 'Get finishAge' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.finishAgeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update finishAge' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFinishAgeDto: UpdateFinishAgeDto,
  ) {
    return await this.finishAgeService.update(+id, updateFinishAgeDto);
  }

  @ApiOperation({ summary: 'Delete finishAge' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.finishAgeService.delete(id);
  }
}
