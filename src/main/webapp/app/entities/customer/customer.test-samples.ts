import { ICustomer, NewCustomer } from './customer.model';

export const sampleWithRequiredData: ICustomer = {
  id: 24379,
  firstName: 'Erin',
  lastName: 'White',
  email: 'Deontae_Hermiston88@yahoo.com',
};

export const sampleWithPartialData: ICustomer = {
  id: 26986,
  firstName: 'Raina',
  lastName: 'Rohan',
  email: 'Josue_Morar85@yahoo.com',
};

export const sampleWithFullData: ICustomer = {
  id: 58190,
  firstName: 'Erica',
  lastName: 'Becker',
  email: 'Lucious.Zulauf12@gmail.com',
  address: 'THX Estonia',
  phoneNumber: 'calculate front-end Towels',
};

export const sampleWithNewData: NewCustomer = {
  firstName: 'Lenna',
  lastName: 'Gleason',
  email: 'Mazie56@yahoo.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
