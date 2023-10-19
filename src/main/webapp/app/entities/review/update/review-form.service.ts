import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IReview, NewReview } from '../review.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReview for edit and NewReviewFormGroupInput for create.
 */
type ReviewFormGroupInput = IReview | PartialWithRequiredKeyOf<NewReview>;

type ReviewFormDefaults = Pick<NewReview, 'id'>;

type ReviewFormGroupContent = {
  id: FormControl<IReview['id'] | NewReview['id']>;
  rating: FormControl<IReview['rating']>;
  comment: FormControl<IReview['comment']>;
  product: FormControl<IReview['product']>;
  customer: FormControl<IReview['customer']>;
};

export type ReviewFormGroup = FormGroup<ReviewFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReviewFormService {
  createReviewFormGroup(review: ReviewFormGroupInput = { id: null }): ReviewFormGroup {
    const reviewRawValue = {
      ...this.getFormDefaults(),
      ...review,
    };
    return new FormGroup<ReviewFormGroupContent>({
      id: new FormControl(
        { value: reviewRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      rating: new FormControl(reviewRawValue.rating, {
        validators: [Validators.required, Validators.min(1), Validators.max(5)],
      }),
      comment: new FormControl(reviewRawValue.comment),
      product: new FormControl(reviewRawValue.product),
      customer: new FormControl(reviewRawValue.customer),
    });
  }

  getReview(form: ReviewFormGroup): IReview | NewReview {
    return form.getRawValue() as IReview | NewReview;
  }

  resetForm(form: ReviewFormGroup, review: ReviewFormGroupInput): void {
    const reviewRawValue = { ...this.getFormDefaults(), ...review };
    form.reset(
      {
        ...reviewRawValue,
        id: { value: reviewRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ReviewFormDefaults {
    return {
      id: null,
    };
  }
}
