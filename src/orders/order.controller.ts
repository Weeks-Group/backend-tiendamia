import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { Order } from '@prisma/client';
import { orderSchema, Status } from './order.schemas';
import { JoiValidationPipe } from 'src/joi.validation.pipe';
import { OrderService } from './order.service';
import { OrderDto } from './order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getClients(
    @Query() query: { status?: Status; initial?: Date; last?: Date },
  ): Promise<Order[]> {
    switch (query.status) {
      case Status.Approve:
        return this.orderService.findOrdersApprove();
      case Status.Traveling:
        return this.orderService.findOrdersTraveling({
          initial: query?.initial ?? new Date(),
          last: query?.last ?? new Date(),
        });
      default:
        break;
    }
    return this.orderService.orders({});
  }

  @Get(':id')
  async getClient(@Param('id') id: number): Promise<Order> {
    return this.orderService.order({ id: Number(id) });
  }

  @UsePipes(new JoiValidationPipe(orderSchema))
  @Post()
  async createClient(@Body() order: OrderDto): Promise<Order> {
    return this.orderService.createOrder(order);
  }
}
