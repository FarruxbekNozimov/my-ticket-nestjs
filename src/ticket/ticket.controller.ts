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
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketService } from './ticket.service';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiOperation({ summary: 'Create a ticket' })
  @Post()
  createComfort(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @ApiOperation({ summary: 'Get all ticket' })
  @Get()
  getAllComforts() {
    return this.ticketService.findAll();
  }

  @ApiOperation({ summary: 'Get ticket' })
  @Get(':id')
  getComfortById(@Param('id') id: number) {
    return this.ticketService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update ticket' })
  @Put(':id')
  async updateComfort(
    @Param('id') id: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return await this.ticketService.update(+id, updateTicketDto);
  }

  @ApiOperation({ summary: 'Delete ticket' })
  @Delete(':id')
  async deleteComfort(@Param('id') id: number): Promise<number> {
    return await this.ticketService.delete(id);
  }
}
