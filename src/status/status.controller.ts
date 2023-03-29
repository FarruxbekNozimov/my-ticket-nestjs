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
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusService } from './status.service';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: 'Create a status' })
  @Post()
  createComfort(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @ApiOperation({ summary: 'Get all status' })
  @Get()
  getAllComforts() {
    return this.statusService.findAll();
  }

  @ApiOperation({ summary: 'Get status' })
  @Get(':id')
  getComfortById(@Param('id') id: number) {
    return this.statusService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update status' })
  @Put(':id')
  async updateComfort(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return await this.statusService.update(+id, updateStatusDto);
  }

  @ApiOperation({ summary: 'Delete status' })
  @Delete(':id')
  async deleteComfort(@Param('id') id: number): Promise<number> {
    return await this.statusService.delete(id);
  }
}
