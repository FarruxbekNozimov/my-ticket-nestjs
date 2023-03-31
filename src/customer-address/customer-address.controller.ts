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
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { CustomerAddressService } from './customer-address.service';

@ApiTags('CustomerAddress')
@Controller('customer-address')
export class CustomerAddressController {
  constructor(private readonly customerAddressService: CustomerAddressService) {}

  @ApiOperation({ summary: 'Create a customerAddress' })
  @Post()
  create(@Body() createCustomerAddressDto: CreateCustomerAddressDto) {
    return this.customerAddressService.create(createCustomerAddressDto);
  }

  @ApiOperation({ summary: 'Get all customerAddress' })
  @Get()
  findAll() {
    return this.customerAddressService.findAll();
  }

  @ApiOperation({ summary: 'Get customerAddress' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customerAddressService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update customerAddress' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCustomerAddressDto: UpdateCustomerAddressDto,
  ) {
    return await this.customerAddressService.update(+id, updateCustomerAddressDto);
  }

  @ApiOperation({ summary: 'Delete customerAddress' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.customerAddressService.delete(id);
  }
}
