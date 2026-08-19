import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { PUBLIC_API_BASE_URL } from '../../core/commerce.models';
import { CartStore } from '../../core/cart.store';
import { CheckoutStatusPageComponent } from './checkout-status-page.component';

const orderId = 'd7f5ff29-2c18-4e3b-b635-630eda25b5d8';

describe('CheckoutStatusPageComponent', () => {
  let fixture: ComponentFixture<CheckoutStatusPageComponent>;
  let component: CheckoutStatusPageComponent;
  let http: HttpTestingController;
  let cart: CartStore;

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('does not show PAID from success query approved when backend is awaiting_payment', () => {
    setup('checkout/success', { external_reference: orderId, status: 'approved' });
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`);
    request.flush({ orderId, status: 'awaiting_payment' });
    fixture.detectChanges();
    expect(component.status()).toBe('AWAITING_PAYMENT');
    expect(component.title()).not.toBe('Pago confirmado');
    expect(cart.items().length).toBe(1);
  });

  it('keeps the cart for lowercase awaiting_payment from the backend', () => {
    setup('checkout/pending', { external_reference: orderId });
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`);
    request.flush({ orderId, status: 'awaiting_payment' });
    fixture.detectChanges();
    expect(component.status()).toBe('AWAITING_PAYMENT');
    expect(component.title()).not.toBe('Pago confirmado');
    expect(component.description()).toContain('coordinar el retiro');
    expect(cart.items().length).toBe(1);
  });

  it('shows PAID and clears the persisted cart when backend status is paid', () => {
    setup('checkout/success', { external_reference: orderId });
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`);
    request.flush({ orderId, status: 'paid' });
    fixture.detectChanges();
    expect(component.title()).toBe('Pago confirmado');
    expect(component.description()).toContain('coordinar el retiro');
    expect(cart.items()).toEqual([]);
    expect(localStorage.getItem('gatarsis.shop.cart.v1')).toContain('"items":[]');
    expect(component.canRetryPayment()).toBe(false);
  });

  it('shows PAID even on failure route when backend says paid', () => {
    setup('checkout/failure', { external_reference: orderId, status: 'rejected' });
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`);
    request.flush({ orderId, status: 'paid' });
    fixture.detectChanges();
    expect(component.title()).toBe('Pago confirmado');
  });

  it('keeps the cart for lowercase payment_pending from the backend', () => {
    setup('checkout/pending', { external_reference: orderId });
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`);
    request.flush({ orderId, status: 'payment_pending' });
    expect(component.status()).toBe('PAYMENT_PENDING');
    expect(component.title()).toBe('Tu pago está pendiente');
    expect(cart.items().length).toBe(1);
  });

  it('stops polling after backend status paid', () => {
    vi.useFakeTimers();
    try {
      setup('checkout/success', { external_reference: orderId });
      const request = http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`);
      request.flush({ orderId, status: 'paid' });
      vi.advanceTimersByTime(4000);
      http.expectNone(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`);
      expect(component.canConsult()).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not request status for malformed external_reference or preferenceId-looking value', () => {
    setup('checkout/success', { external_reference: '2252402486-provider-preference' });
    http.expectNone((request) => request.url.includes('/orders/'));
    expect(component.error()).toBe('No encontramos un pedido válido para consultar.');
  });

  function setup(path: string, query: Record<string, string>): void {
    localStorage.clear();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [CheckoutStatusPageComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap(query),
              routeConfig: { path },
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(CheckoutStatusPageComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    cart = TestBed.inject(CartStore);
    cart.add({
      variantId: 'variant-id',
      productId: 'product-id',
      productSlug: 'producto',
      productName: 'Producto',
      variantName: 'Variante',
      sku: 'SKU',
      unitPriceInCents: 100,
      quantity: 1,
      availableStock: 1,
      imageUrl: null,
    });
    fixture.detectChanges();
  }
});
