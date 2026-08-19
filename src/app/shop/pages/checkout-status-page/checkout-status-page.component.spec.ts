import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { PUBLIC_API_BASE_URL } from '../../core/commerce.models';
import { CartStore } from '../../core/cart.store';
import { CheckoutStatusPageComponent } from './checkout-status-page.component';

const orderId = 'd7f5ff29-2c18-4e3b-b635-630eda25b5d8';

describe('CheckoutStatusPageComponent payment safety', () => {
  let fixture: ComponentFixture<CheckoutStatusPageComponent>;
  let component: CheckoutStatusPageComponent;
  let http: HttpTestingController;
  let cart: CartStore;

  afterEach(() => { http.verify(); localStorage.clear(); });

  it.each(['awaiting_payment', 'payment_pending'] as const)('does not offer another payment while backend reports %s', (status) => {
    setup('checkout/pending', { external_reference: orderId, status: 'approved' });
    http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`).flush({ orderId, status });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('Intentar pagar nuevamente');
    expect(fixture.nativeElement.textContent).toContain('no vuelvas a pagarlo');
    expect(fixture.nativeElement.querySelector('.animate-spin')).toBeTruthy();
    expect(component.isPending()).toBe(true);
    expect(cart.checkoutContext()?.status).toBe(status === 'awaiting_payment' ? 'AWAITING_PAYMENT' : 'PAYMENT_PENDING');
  });

  it('uses only GET status while polling a pending checkout', () => {
    setup('checkout/pending', { external_reference: orderId });
    http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`).flush({ orderId, status: 'awaiting_payment' });
    component.consult();
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`);
    expect(request.request.method).toBe('GET');
    request.flush({ orderId, status: 'payment_pending' });
    http.expectNone((request) => request.url.includes('preference') || request.url.includes('reserve'));
  });

  it('does not trust success query params when backend remains pending', () => {
    setup('checkout/success', { external_reference: orderId, status: 'approved' });
    http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`).flush({ orderId, status: 'awaiting_payment' });
    expect(component.title()).not.toBe('Pago confirmado');
    expect(cart.items().length).toBe(1);
  });

  it('clears cart and checkout context only when backend confirms paid', () => {
    setup('checkout/success', { external_reference: orderId });
    http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`).flush({ orderId, status: 'paid' });
    expect(cart.items()).toEqual([]);
    expect(cart.checkoutContext()).toBeNull();
  });

  it.each(['expired', 'cancelled', 'refunded'] as const)('releases the local checkout context when backend returns %s', (status) => {
    setup('checkout/pending', { external_reference: orderId });
    http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`).flush({ orderId, status });
    expect(cart.checkoutContext()).toBeNull();
    expect(cart.items().length).toBe(1);
  });

  it('stops polling after paid', () => {
    vi.useFakeTimers();
    try {
      setup('checkout/success', { external_reference: orderId });
      http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`).flush({ orderId, status: 'paid' });
      vi.advanceTimersByTime(4000);
      http.expectNone(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`);
    } finally { vi.useRealTimers(); }
  });

  function setup(path: string, query: Record<string, string>): void {
    localStorage.clear(); TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [CheckoutStatusPageComponent], providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting(), { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap(query), routeConfig: { path } } } }] });
    fixture = TestBed.createComponent(CheckoutStatusPageComponent); component = fixture.componentInstance; http = TestBed.inject(HttpTestingController); cart = TestBed.inject(CartStore);
    cart.add({ variantId: 'variant-id', productId: 'product-id', productSlug: 'producto', productName: 'Producto', variantName: 'Variante', sku: 'SKU', unitPriceInCents: 100, quantity: 1, availableStock: 1, imageUrl: null });
    fixture.detectChanges();
  }
});
