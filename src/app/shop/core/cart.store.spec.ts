import { TestBed } from '@angular/core/testing';
import { CartStore } from './cart.store';

const item = {
  variantId: 'variant-a',
  productId: 'product',
  productSlug: 'taza',
  productName: 'Taza',
  variantName: 'Lila',
  sku: 'SKU-A',
  unitPriceInCents: 1500,
  quantity: 1,
  availableStock: 2,
  imageUrl: null,
};

describe('CartStore', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('adds items and increments the same variant without duplicating rows', () => {
    const cart = TestBed.inject(CartStore);
    cart.add(item);
    cart.add(item);
    expect(cart.items().length).toBe(1);
    expect(cart.items()[0].quantity).toBe(2);
    expect(cart.totalItems()).toBe(2);
  });

  it('keeps different variants as separate rows and removes immediately', () => {
    const cart = TestBed.inject(CartStore);
    cart.add(item);
    cart.add({ ...item, variantId: 'variant-b', sku: 'SKU-B' });
    expect(cart.items().length).toBe(2);
    cart.remove('variant-a');
    expect(cart.items().map((entry) => entry.variantId)).toEqual(['variant-b']);
  });

  it('clamps quantity to known stock and persists to localStorage', () => {
    const cart = TestBed.inject(CartStore);
    cart.add({ ...item, quantity: 5 });
    expect(cart.items()[0].quantity).toBe(2);
    TestBed.resetTestingModule();
    const restored = TestBed.inject(CartStore);
    expect(restored.items()[0].quantity).toBe(2);
  });

  it('discard corrupt storage safely', () => {
    localStorage.setItem('gatarsis.shop.cart.v1', '{bad json');
    const cart = TestBed.inject(CartStore);
    expect(cart.items()).toEqual([]);
  });

  it('clears cart and builds reserve payload without prices', () => {
    const cart = TestBed.inject(CartStore);
    cart.add(item);
    expect(cart.reservePayload()).toEqual({ items: [{ variantId: 'variant-a', quantity: 1 }] });
    cart.clear();
    expect(cart.items()).toEqual([]);
  });

  it('restores a pending checkout context after reload without storing customer data', () => {
    const cart = TestBed.inject(CartStore);
    cart.saveCheckoutContext({
      orderId: 'd7f5ff29-2c18-4e3b-b635-630eda25b5d8',
      status: 'PAYMENT_PENDING',
      reservationExpiresAt: '2026-01-01T00:10:00Z',
    });
    TestBed.resetTestingModule();
    const restored = TestBed.inject(CartStore);
    expect(restored.checkoutContext()).toEqual({
      orderId: 'd7f5ff29-2c18-4e3b-b635-630eda25b5d8',
      status: 'PAYMENT_PENDING',
      reservationExpiresAt: '2026-01-01T00:10:00Z',
    });
  });
});
