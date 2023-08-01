import { BadRequestException, Injectable } from '@nestjs/common';
import { Client, Order, Prisma, Item } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { OrderDto } from './order.dto';
import * as dayjs from 'dayjs';
import { Status } from './order.schemas';

type DateProps = {
  initial: Date;
  last: Date;
};
@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async order(
    orderWhereUniqueInput: Prisma.OrderWhereUniqueInput,
  ): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: orderWhereUniqueInput,
      include: { items: { include: { item: true } }, client: true },
    });
  }

  async orders(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<Order[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.order.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { items: { include: { item: true } }, client: true },
    });
  }

  async createOrder(data: OrderDto): Promise<Order> {
    const { items, ...rest } = data;
    const itemsResolve = await this.prisma.item.findMany({
      where: {
        id: { in: items },
      },
    });
    if (itemsResolve.length !== items.length) {
      throw new BadRequestException('No found Items');
    }

    return this.prisma.order.create({
      data: {
        shippingAddress: rest.shippingAddress,
        shippingPromise: dayjs(rest.shippingPromise).toDate(),
        status: rest.status,
        clientId: rest.clientId,
        items: {
          createMany: {
            data: itemsResolve.map((p) => ({ itemId: p.id })),
          },
        },
      },
      include: {
        items: true,
      },
    });
  }

  async updateOrder(params: {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.OrderUpdateInput;
  }): Promise<Order> {
    const { where, data } = params;
    return this.prisma.order.update({
      data,
      where,
    });
  }

  async findOrdersApprove(): Promise<Order[]> {
    const date = dayjs().startOf('day');

    return this.prisma.order.findMany({
      where: {
        status: Status.Approve,
        shippingPromise: {
          gte: date.toISOString(),
          lte: date.add(2, 'day').toISOString(),
        },
      },
      include: { items: { include: { item: true } }, client: true },
    });
  }

  async findOrdersTraveling({ initial, last }: DateProps): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: {
        status: Status.Traveling,
        createDate: {
          gte: dayjs(initial).toISOString(),
          lte: dayjs(last).toISOString(),
        },
      },
      include: { items: { include: { item: true } }, client: true },
    });
  }

  async deleteOrder(where: Prisma.OrderWhereUniqueInput): Promise<Order> {
    return this.prisma.order.delete({
      where,
    });
  }
}
