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
import { CreateCustomerCardDto } from './dto/create-customer-card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer-card.dto';
import { CustomerCardService } from './customer-card.service';

@ApiTags('CustomerCard')
@Controller('customer-card')
export class CustomerCardController {
  constructor(private readonly customerCardService: CustomerCardService) {}

  @ApiOperation({ summary: 'Create a customerCard' })
  @Post()
  createComfort(@Body() createCustomerCardDto: CreateCustomerCardDto) {
    return this.customerCardService.create(createCustomerCardDto);
  }

  @ApiOperation({ summary: 'Get all customerCard' })
  @Get()
  getAllComforts() {
    return this.customerCardService.findAll();
  }

  @ApiOperation({ summary: 'Get customerCard' })
  @Get(':id')
  getComfortById(@Param('id') id: number) {
    return this.customerCardService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update customerCard' })
  @Put(':id')
  async updateComfort(
    @Param('id') id: number,
    @Body() updateCustomerCardDto: UpdateCustomerCardDto,
  ) {
    return await this.customerCardService.update(+id, updateCustomerCardDto);
  }

  @ApiOperation({ summary: 'Delete customerCard' })
  @Delete(':id')
  async deleteComfort(@Param('id') id: number): Promise<number> {
    return await this.customerCardService.delete(id);
  }
}
