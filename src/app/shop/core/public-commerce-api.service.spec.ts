import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PUBLIC_API_BASE_URL } from './commerce.models';
import { PublicCommerceApiService } from './public-commerce-api.service';

describe('PublicCommerceApiService', () => {
  let api: PublicCommerceApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    api = TestBed.inject(PublicCommerceApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads the public catalog from the real public endpoint', () => {
    api.products().subscribe((products) => {
      expect(products[0].variants[0].availableStock).toBe(3);
    });
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/products`);
    expect(request.request.method).toBe('GET');
    request.flush([
      {
        id: 'product-id',
        slug: 'taza',
        name: 'Taza',
        media: [],
        variants: [{ id: 'variant-id', sku: 'SKU', name: 'Lila', color: null, size: null, priceInCents: 1500, availableStock: 3 }],
      },
    ]);
  });

  it('reserves with Idempotency-Key and sends the fulfillment contract', () => {
    api.reserve({
      items: [{ variantId: 'variant-id', quantity: 2 }],
      customer: { name: 'Ada Lovelace', email: 'ada@example.com', phone: '2494000000' },
      fulfillment: { method: 'PICKUP', note: null },
    }, 'attempt-key').subscribe();
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/checkout/reserve`);
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Idempotency-Key')).toBe('attempt-key');
    expect(request.request.body).toEqual({
      items: [{ variantId: 'variant-id', quantity: 2 }],
      customer: { name: 'Ada Lovelace', email: 'ada@example.com', phone: '2494000000' },
      fulfillment: { method: 'PICKUP', note: null },
    });
    expect(JSON.stringify(request.request.body)).not.toContain('price');
    request.flush({ orderId: 'order-id', status: 'awaiting_payment', totalInCents: 3000, reservationExpiresAt: '2026-01-01T00:10:00Z' });
  });

  it('creates preference for an order and relies on backend initPoint', () => {
    api.createMercadoPagoPreference('order-id').subscribe((response) => {
      expect(response.initPoint).toBe('https://mercadopago.test/checkout');
    });
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/checkout/order-id/mercado-pago/preference`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({});
    request.flush({ orderId: 'order-id', preferenceId: 'provider-preference', initPoint: 'https://mercadopago.test/checkout' });
  });

  it('normalizes the lowercase status returned by the backend at the HTTP boundary', () => {
    api.orderStatus('order-id').subscribe((response) => expect(response.status).toBe('PAID'));
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/orders/order-id/status`);
    expect(request.request.method).toBe('GET');
    request.flush({ orderId: 'order-id', status: 'paid' });
  });

  it('normalizes every documented lowercase order status', () => {
    const statuses = [
      ['awaiting_payment', 'AWAITING_PAYMENT'],
      ['payment_pending', 'PAYMENT_PENDING'],
      ['paid', 'PAID'],
      ['expired', 'EXPIRED'],
      ['cancelled', 'CANCELLED'],
      ['refunded', 'REFUNDED'],
    ] as const;
    for (const [httpStatus, internalStatus] of statuses) {
      api.orderStatus(`order-${httpStatus}`).subscribe((response) => expect(response.status).toBe(internalStatus));
      http.expectOne(`${PUBLIC_API_BASE_URL}/orders/order-${httpStatus}/status`).flush({
        orderId: `order-${httpStatus}`,
        status: httpStatus,
      });
    }
  });
});
