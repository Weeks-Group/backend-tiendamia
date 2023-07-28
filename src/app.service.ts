import { Injectable } from '@nestjs/common';
import { Client, Item, Order } from '@prisma/client';
import * as fs from 'fs';
import { OrderService } from './orders/order.service';
import { ItemService } from './items/items.service';
import { ClientService } from './clients/clients.service';
@Injectable()
export class AppService {
  constructor(
    private readonly orderService: OrderService,
    private readonly itemService: ItemService,
    private readonly clientService: ClientService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async dumpClient(): Promise<Client[]> {
    const data = './mooks/clients.json';
    const rawData = fs.readFileSync(data);
    const jsonData: any[] = JSON.parse(rawData.toString());

    const resolve = await Promise.all(
      await jsonData.map((data) => {
        return this.clientService.createClient(data);
      }),
    );
    return resolve;
  }

  async dumpItems(): Promise<Item[]> {
    const data = './mooks/items.json';
    const rawData = fs.readFileSync(data);
    const jsonData: any[] = JSON.parse(rawData.toString());

    const resolve = await Promise.all(
      await jsonData.map((data) => {
        return this.itemService.createItem(data);
      }),
    );
    return resolve;
  }
  async dumpOrders(): Promise<Order[]> {
    const data = './mooks/orders.json';
    const rawData = fs.readFileSync(data);
    const jsonData: any[] = JSON.parse(rawData.toString());

    const resolve = await Promise.all(
      await jsonData.map((data) => {
        return this.orderService.createOrder(data);
      }),
    );

    return resolve;
  }
}
