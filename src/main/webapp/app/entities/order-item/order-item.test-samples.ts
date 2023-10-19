import { IOrderItem, NewOrderItem } from './order-item.model';

export const sampleWithRequiredData: IOrderItem = {
  id: 62496,
  quantity: 85505,
};

export const sampleWithPartialData: IOrderItem = {
  id: 70793,
  quantity: 30852,
};

export const sampleWithFullData: IOrderItem = {
  id: 61163,
  quantity: 15882,
};

export const sampleWithNewData: NewOrderItem = {
  quantity: 50845,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
