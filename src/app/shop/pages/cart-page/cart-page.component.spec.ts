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
    component.customer = { name: 'Ada Lovelace', email: 'ada@example.com', phone: '249 400 0000', note: 'Llamar por la tarde' };
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
    expect(requests[0].request.body).toEqual({
      items: [{ variantId: 'variant-id', quantity: 2 }],
      customer: { name: 'Ada Lovelace', email: 'ada@example.com', phone: '249 400 0000' },
      fulfillment: { method: 'PICKUP', note: 'Llamar por la tarde' },
    });
    requests[0].flush({ orderId: 'order-id', status: 'awaiting_payment', totalInCents: 200, reservationExpiresAt: '2026-01-01T00:10:00Z' });
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

  it('does not reserve when the name is empty or whitespace only', () => {
    component.customer.name = '   ';
    component.checkout();
    http.expectNone(`${PUBLIC_API_BASE_URL}/checkout/reserve`);
    expect(component.customerError()).toBe('Ingresá tu nombre y apellido.');
  });

  it('does not reserve with an invalid email or missing phone', () => {
    component.customer.email = 'no-es-email';
    component.checkout();
    http.expectNone(`${PUBLIC_API_BASE_URL}/checkout/reserve`);
    expect(component.customerError()).toBe('Ingresá un email válido.');

    component.customer.email = 'ada@example.com';
    component.customer.phone = '   ';
    component.checkout();
    http.expectNone(`${PUBLIC_API_BASE_URL}/checkout/reserve`);
    expect(component.customerError()).toBe('Ingresá un teléfono o WhatsApp.');
  });

  it('trims customer data in the reserve payload and never persists it in the cart', () => {
    component.customer = { name: ' Ada Lovelace ', email: ' ada@example.com ', phone: ' 249 400 0000 ', note: ' retiro por la tarde ' };
    component.checkout();
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/checkout/reserve`);
    expect(request.request.body).toEqual({
      items: [{ variantId: 'variant-id', quantity: 2 }],
      customer: { name: 'Ada Lovelace', email: 'ada@example.com', phone: '249 400 0000' },
      fulfillment: { method: 'PICKUP', note: 'retiro por la tarde' },
    });
    const persistedCart = localStorage.getItem('gatarsis.shop.cart.v1') ?? '';
    expect(persistedCart).not.toContain('Ada Lovelace');
    expect(persistedCart).not.toContain('ada@example.com');
    request.flush({ code: 'OUT_OF_STOCK' }, { status: 409, statusText: 'Conflict' });
  });
});
