import dayjs from 'dayjs/esm';

import { IOrder, NewOrder } from './order.model';

export const sampleWithRequiredData: IOrder = {
  id: 47761,
  orderDate: dayjs('2023-10-19'),
  totalPrice: 70907,
};

export const sampleWithPartialData: IOrder = {
  id: 52696,
  orderDate: dayjs('2023-10-18'),
  totalPrice: 34054,
};

export const sampleWithFullData: IOrder = {
  id: 47091,
  orderDate: dayjs('2023-10-18'),
  totalPrice: 84971,
};

export const sampleWithNewData: NewOrder = {
  orderDate: dayjs('2023-10-19'),
  totalPrice: 68170,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
