import dayjs from 'dayjs/esm';
import { ICustomer } from 'app/entities/customer/customer.model';

export interface IOrder {
  id: number;
  orderDate?: dayjs.Dayjs | null;
  totalPrice?: number | null;
  customer?: Pick<ICustomer, 'id' | 'firstName'> | null;
}

export type NewOrder = Omit<IOrder, 'id'> & { id: null };
