import { IReview, NewReview } from './review.model';

export const sampleWithRequiredData: IReview = {
  id: 33078,
  rating: 3,
};

export const sampleWithPartialData: IReview = {
  id: 93908,
  rating: 5,
  comment: 'mesh transmitting state',
};

export const sampleWithFullData: IReview = {
  id: 10183,
  rating: 2,
  comment: 'panel',
};

export const sampleWithNewData: NewReview = {
  rating: 4,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
