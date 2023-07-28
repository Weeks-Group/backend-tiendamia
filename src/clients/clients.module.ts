import { Module } from '@nestjs/common';
import { ClientController } from './clients.controller';
import { ClientService } from './clients.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaService],
})
export class ClientsModule {}
