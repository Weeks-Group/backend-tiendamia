import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('dumps')
  async createDump(): Promise<boolean> {
    const clients = await this.appService.dumpClient();
    const items = await this.appService.dumpItems();
    const orders = await this.appService.dumpOrders();

    return true;
  }
}
