import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/order.module';
import { ClientService } from './clients/clients.service';
import { ItemService } from './items/items.service';
import { OrderService } from './orders/order.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), ClientsModule, ItemsModule, OrdersModule],
  controllers: [AppController],
  providers: [
    AppService,
    ClientService,
    ItemService,
    OrderService,
    PrismaService,
  ],
})
export class AppModule {}
