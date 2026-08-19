import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PUBLIC_API_BASE_URL } from '../../core/commerce.models';
import { CartStore } from '../../core/cart.store';
import { CartPageComponent } from './cart-page.component';

describe('CartPageComponent checkout', () => {
  let fixture: ComponentFixture<CartPageComponent>;
  let component: CartPageComponent;
  let http: HttpTestingController;
  let cart: CartStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [CartPageComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    cart = TestBed.inject(CartStore);
    http = TestBed.inject(HttpTestingController);
    cart.add({
      variantId: 'variant-id',
      productId: 'product-id',
      productSlug: 'producto',
      productName: 'Producto',
      variantName: 'Variante',
      sku: 'SKU',
      unitPriceInCents: 100,
      quantity: 2,
      availableStock: 2,
      imageUrl: null,
    });
    fixture.detectChanges();
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('double click creates only one reserve request', () => {
    const redirect = vi
      .spyOn(component as unknown as { redirectTo: (url: string) => void }, 'redirectTo')
      .mockImplementation(() => undefined);
    component.checkout();
    component.checkout();

    const requests = http.match(`${PUBLIC_API_BASE_URL}/checkout/reserve`);
    expect(requests.length).toBe(1);
    expect(requests[0].request.headers.has('Idempotency-Key')).toBe(true);
    expect(requests[0].request.body).toEqual({ items: [{ variantId: 'variant-id', quantity: 2 }] });
    requests[0].flush({ orderId: 'order-id', status: 'AWAITING_PAYMENT', totalInCents: 200, reservationExpiresAt: '2026-01-01T00:10:00Z' });
    const preference = http.expectOne(`${PUBLIC_API_BASE_URL}/checkout/order-id/mercado-pago/preference`);
    preference.flush({ orderId: 'order-id', preferenceId: 'provider-preference', initPoint: 'https://mp.test/init' });
    expect(redirect).toHaveBeenCalledWith('https://mp.test/init');
  });

  it('reserve failure does not create Mercado Pago preference', () => {
    component.checkout();
    const reserve = http.expectOne(`${PUBLIC_API_BASE_URL}/checkout/reserve`);
    reserve.flush({ code: 'OUT_OF_STOCK' }, { status: 409, statusText: 'Conflict' });
    http.expectNone((request) => request.url.includes('/mercado-pago/preference'));
    expect(component.state()).toBe('ERROR');
  });
});
