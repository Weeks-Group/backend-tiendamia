import { AppService } from 'src/app.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { orderSchema, dateValidation } from './order.schemas';
import { JoiValidationPipe } from 'src/joi.validation.pipe';
import { OrderService } from './order.service';
import { OrderDto } from './order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getClients(): Promise<Order[]> {
    return this.orderService.orders({});
  }

  @Get('findOne/:id')
  async getClient(@Param('id') id: number): Promise<Order> {
    return this.orderService.order({ id: Number(id) });
  }

  @UsePipes(new JoiValidationPipe(orderSchema))
  @Post()
  async createClient(@Body() order: OrderDto): Promise<Order> {
    return this.orderService.createOrder(order);
  }

  @Get('findApprove')
  async findApprove(): Promise<Order[]> {
    return this.orderService.findOrdersApprove();
  }

  @Get('findTraveling')
  @UsePipes(new JoiValidationPipe(dateValidation))
  async findTraveling(
    @Query() query: { initial: Date; last: Date },
  ): Promise<Order[]> {
    return this.orderService.findOrdersTraveling(query);
  }
}
