import { Status } from './order.schemas';

export class OrderDto {
  status: Status;
  clientId: number;
  shippingAddress: string;
  shippingPromise: Date;
  items: number[];
}
