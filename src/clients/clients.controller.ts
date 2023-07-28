import { AppService } from 'src/app.service';
import { ClientService } from './clients.service';
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { Client, Prisma } from '@prisma/client';
import { clientSchema } from './client.schemas';
import { JoiValidationPipe } from 'src/joi.validation.pipe';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getClients(): Promise<Client[]> {
    return this.clientService.clients({});
  }

  @Get(':id')
  async getClient(@Param('id') id: number): Promise<Client> {
    return this.clientService.client({ id: Number(id) });
  }

  @UsePipes(new JoiValidationPipe(clientSchema))
  @Post()
  async createClient(
    @Body() client: Prisma.ClientCreateInput,
  ): Promise<Client> {
    return this.clientService.createClient(client);
  }
}
