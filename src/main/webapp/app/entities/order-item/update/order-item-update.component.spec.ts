import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OrderItemFormService } from './order-item-form.service';
import { OrderItemService } from '../service/order-item.service';
import { IOrderItem } from '../order-item.model';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { IOrder } from 'app/entities/order/order.model';
import { OrderService } from 'app/entities/order/service/order.service';

import { OrderItemUpdateComponent } from './order-item-update.component';

describe('OrderItem Management Update Component', () => {
  let comp: OrderItemUpdateComponent;
  let fixture: ComponentFixture<OrderItemUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let orderItemFormService: OrderItemFormService;
  let orderItemService: OrderItemService;
  let productService: ProductService;
  let orderService: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [OrderItemUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(OrderItemUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OrderItemUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    orderItemFormService = TestBed.inject(OrderItemFormService);
    orderItemService = TestBed.inject(OrderItemService);
    productService = TestBed.inject(ProductService);
    orderService = TestBed.inject(OrderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Product query and add missing value', () => {
      const orderItem: IOrderItem = { id: 456 };
      const product: IProduct = { id: 84737 };
      orderItem.product = product;

      const productCollection: IProduct[] = [{ id: 25918 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [product];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ orderItem });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(
        productCollection,
        ...additionalProducts.map(expect.objectContaining)
      );
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Order query and add missing value', () => {
      const orderItem: IOrderItem = { id: 456 };
      const order: IOrder = { id: 39120 };
      orderItem.order = order;

      const orderCollection: IOrder[] = [{ id: 6598 }];
      jest.spyOn(orderService, 'query').mockReturnValue(of(new HttpResponse({ body: orderCollection })));
      const additionalOrders = [order];
      const expectedCollection: IOrder[] = [...additionalOrders, ...orderCollection];
      jest.spyOn(orderService, 'addOrderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ orderItem });
      comp.ngOnInit();

      expect(orderService.query).toHaveBeenCalled();
      expect(orderService.addOrderToCollectionIfMissing).toHaveBeenCalledWith(
        orderCollection,
        ...additionalOrders.map(expect.objectContaining)
      );
      expect(comp.ordersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const orderItem: IOrderItem = { id: 456 };
      const product: IProduct = { id: 72954 };
      orderItem.product = product;
      const order: IOrder = { id: 30033 };
      orderItem.order = order;

      activatedRoute.data = of({ orderItem });
      comp.ngOnInit();

      expect(comp.productsSharedCollection).toContain(product);
      expect(comp.ordersSharedCollection).toContain(order);
      expect(comp.orderItem).toEqual(orderItem);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOrderItem>>();
      const orderItem = { id: 123 };
      jest.spyOn(orderItemFormService, 'getOrderItem').mockReturnValue(orderItem);
      jest.spyOn(orderItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ orderItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: orderItem }));
      saveSubject.complete();

      // THEN
      expect(orderItemFormService.getOrderItem).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(orderItemService.update).toHaveBeenCalledWith(expect.objectContaining(orderItem));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOrderItem>>();
      const orderItem = { id: 123 };
      jest.spyOn(orderItemFormService, 'getOrderItem').mockReturnValue({ id: null });
      jest.spyOn(orderItemService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ orderItem: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: orderItem }));
      saveSubject.complete();

      // THEN
      expect(orderItemFormService.getOrderItem).toHaveBeenCalled();
      expect(orderItemService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOrderItem>>();
      const orderItem = { id: 123 };
      jest.spyOn(orderItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ orderItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(orderItemService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProduct', () => {
      it('Should forward to productService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(productService, 'compareProduct');
        comp.compareProduct(entity, entity2);
        expect(productService.compareProduct).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareOrder', () => {
      it('Should forward to orderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(orderService, 'compareOrder');
        comp.compareOrder(entity, entity2);
        expect(orderService.compareOrder).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
