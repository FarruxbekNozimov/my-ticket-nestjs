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
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartService } from './cart.service';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Create a cart' })
  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @ApiOperation({ summary: 'Get all cart' })
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @ApiOperation({ summary: 'Get cart' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cartService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update cart' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return await this.cartService.update(+id, updateCartDto);
  }

  @ApiOperation({ summary: 'Delete cart' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.cartService.delete(id);
  }
}
