import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
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

  it('does not show PAID from success query approved when backend is awaiting payment', () => {
    setup('checkout/success', { external_reference: orderId, status: 'approved' });
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`);
    request.flush({ orderId, status: 'AWAITING_PAYMENT' });
    fixture.detectChanges();
    expect(component.status()).toBe('AWAITING_PAYMENT');
    expect(component.title()).not.toBe('Pago confirmado');
    expect(cart.items().length).toBe(1);
  });

  it('handles lowercase awaiting_payment from the reserve contract', () => {
    setup('checkout/pending', { external_reference: orderId });
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`);
    request.flush({ orderId, status: 'awaiting_payment' });
    fixture.detectChanges();
    expect(component.status()).toBe('awaiting_payment');
    expect(component.title()).not.toBe('Pago confirmado');
    expect(component.description()).toContain('coordinar el retiro');
    expect(cart.items().length).toBe(1);
  });

  it('shows PAID and clears cart only when backend status is PAID', () => {
    setup('checkout/success', { external_reference: orderId });
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`);
    request.flush({ orderId, status: 'PAID' });
    fixture.detectChanges();
    expect(component.title()).toBe('Pago confirmado');
    expect(component.description()).toContain('coordinar el retiro');
    expect(cart.items()).toEqual([]);
  });

  it('shows PAID even on failure route when backend says PAID', () => {
    setup('checkout/failure', { external_reference: orderId, status: 'rejected' });
    const request = http.expectOne(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`);
    request.flush({ orderId, status: 'PAID' });
    fixture.detectChanges();
    expect(component.title()).toBe('Pago confirmado');
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
