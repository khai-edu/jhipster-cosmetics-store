import { IProduct } from 'app/entities/product/product.model';
import { ICustomer } from 'app/entities/customer/customer.model';

export interface IReview {
  id: number;
  rating?: number | null;
  comment?: string | null;
  product?: Pick<IProduct, 'id' | 'name'> | null;
  customer?: Pick<ICustomer, 'id' | 'firstName'> | null;
}

export type NewReview = Omit<IReview, 'id'> & { id: null };
