import { AppService } from 'src/app.service';
import { ItemService } from './items.service';
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/joi.validation.pipe';
import { Item, Prisma } from '@prisma/client';
import { itemSchema } from './items.schemas';

@Controller('items')
export class ItemController {
  constructor(private readonly ItemService: ItemService) {}

  @Get()
  async getItems(): Promise<Item[]> {
    return this.ItemService.items({});
  }

  @Get(':id')
  async getItem(@Param('id') id: number): Promise<Item> {
    return this.ItemService.item({ id: Number(id) });
  }

  @UsePipes(new JoiValidationPipe(itemSchema))
  @Post()
  async createItem(@Body() item: Prisma.ItemCreateInput): Promise<Item> {
    return this.ItemService.createItem(item);
  }
}
