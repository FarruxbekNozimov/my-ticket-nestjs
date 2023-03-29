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
import { CreateDeliveryMethodDto } from './dto/create-delivery-method.dto';
import { UpdateDeliveryMethodDto } from './dto/update-delivery-method.dto';
import { DeliveryMethodService } from './delivery-method.service';

@ApiTags('DeliveryMethod')
@Controller('delivery-method')
export class DeliveryMethodController {
  constructor(private readonly deliveryMethodService: DeliveryMethodService) {}

  @ApiOperation({ summary: 'Create a deliveryMethod' })
  @Post()
  createComfort(@Body() createDeliveryMethodDto: CreateDeliveryMethodDto) {
    return this.deliveryMethodService.create(createDeliveryMethodDto);
  }

  @ApiOperation({ summary: 'Get all deliveryMethod' })
  @Get()
  getAllComforts() {
    return this.deliveryMethodService.findAll();
  }

  @ApiOperation({ summary: 'Get deliveryMethod' })
  @Get(':id')
  getComfortById(@Param('id') id: number) {
    return this.deliveryMethodService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update deliveryMethod' })
  @Put(':id')
  async updateComfort(
    @Param('id') id: number,
    @Body() updateDeliveryMethodDto: UpdateDeliveryMethodDto,
  ) {
    return await this.deliveryMethodService.update(+id, updateDeliveryMethodDto);
  }

  @ApiOperation({ summary: 'Delete deliveryMethod' })
  @Delete(':id')
  async deleteComfort(@Param('id') id: number): Promise<number> {
    return await this.deliveryMethodService.delete(id);
  }
}
