import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 77672,
  name: 'Customer-focused',
  price: 96307,
  stockCount: 78560,
};

export const sampleWithPartialData: IProduct = {
  id: 7747,
  name: 'Programmable Networked deliver',
  price: 39641,
  stockCount: 99933,
  imageUrl: 'driver synthesizing',
};

export const sampleWithFullData: IProduct = {
  id: 85387,
  name: 'bluetooth District driver',
  description: 'Customer-focused Island',
  price: 13074,
  stockCount: 35902,
  imageUrl: 'Incredible',
};

export const sampleWithNewData: NewProduct = {
  name: 'Dynamic encompassing vertical',
  price: 30768,
  stockCount: 73727,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
