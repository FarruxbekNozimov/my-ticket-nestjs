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
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { EventTypeService } from './event-type.service';

@ApiTags('EventType')
@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @ApiOperation({ summary: 'Create a eventType' })
  @Post()
  createComfort(@Body() createEventTypeDto: CreateEventTypeDto) {
    return this.eventTypeService.create(createEventTypeDto);
  }

  @ApiOperation({ summary: 'Get all eventType' })
  @Get()
  getAllComforts() {
    return this.eventTypeService.findAll();
  }

  @ApiOperation({ summary: 'Get eventType' })
  @Get(':id')
  getComfortById(@Param('id') id: number) {
    return this.eventTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update eventType' })
  @Put(':id')
  async updateComfort(
    @Param('id') id: number,
    @Body() updateEventTypeDto: UpdateEventTypeDto,
  ) {
    return await this.eventTypeService.update(+id, updateEventTypeDto);
  }

  @ApiOperation({ summary: 'Delete eventType' })
  @Delete(':id')
  async deleteComfort(@Param('id') id: number): Promise<number> {
    return await this.eventTypeService.delete(id);
  }
}
