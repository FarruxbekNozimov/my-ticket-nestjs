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
import { CreateTicketTypeDto } from './dto/create-ticket-type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket-type.dto';
import { TicketTypeService } from './ticket-type.service';

@ApiTags('TicketType')
@Controller('ticket-type')
export class TicketTypeController {
  constructor(private readonly ticketTypeService: TicketTypeService) {}

  @ApiOperation({ summary: 'Create a ticketType' })
  @Post()
  createComfort(@Body() createTicketTypeDto: CreateTicketTypeDto) {
    return this.ticketTypeService.create(createTicketTypeDto);
  }

  @ApiOperation({ summary: 'Get all ticketType' })
  @Get()
  getAllComforts() {
    return this.ticketTypeService.findAll();
  }

  @ApiOperation({ summary: 'Get ticketType' })
  @Get(':id')
  getComfortById(@Param('id') id: number) {
    return this.ticketTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update ticketType' })
  @Put(':id')
  async updateComfort(
    @Param('id') id: number,
    @Body() updateTicketTypeDto: UpdateTicketTypeDto,
  ) {
    return await this.ticketTypeService.update(+id, updateTicketTypeDto);
  }

  @ApiOperation({ summary: 'Delete ticketType' })
  @Delete(':id')
  async deleteComfort(@Param('id') id: number): Promise<number> {
    return await this.ticketTypeService.delete(id);
  }
}
