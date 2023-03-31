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
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: 'Create a event' })
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @ApiOperation({ summary: 'Get all event' })
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @ApiOperation({ summary: 'Get event' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update event' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return await this.eventService.update(+id, updateEventDto);
  }

  @ApiOperation({ summary: 'Delete event' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.eventService.delete(id);
  }
}
