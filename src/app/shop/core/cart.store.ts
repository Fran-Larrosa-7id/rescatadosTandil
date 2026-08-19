import { computed, Injectable, signal } from '@angular/core';
import { CartItem, StoredCart } from './cart.models';
import type { PublicOrderStatus } from './commerce.models';

const CART_KEY = 'gatarsis.shop.cart.v1';
const CHECKOUT_KEY = 'gatarsis.shop.checkout.v1';

export interface CheckoutContext {
  orderId: string;
  status: PublicOrderStatus;
  reservationExpiresAt?: string | null;
}

@Injectable({ providedIn: 'root' })
export class CartStore {
  readonly items = signal<CartItem[]>(restoreCart());
  readonly activeCheckout = signal<CheckoutContext | null>(restoreCheckoutContext());
  readonly totalItems = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
  readonly subtotalInCents = computed(() =>
    this.items().reduce((total, item) => total + item.unitPriceInCents * item.quantity, 0),
  );

  add(item: CartItem): void {
    this.items.update((items) => {
      const index = items.findIndex((current) => current.variantId === item.variantId);
      if (index === -1) return persist([...items, { ...item, quantity: clampQuantity(item.quantity, item.availableStock) }]);
      const next = [...items];
      const current = next[index];
      next[index] = {
        ...current,
        ...item,
        quantity: clampQuantity(current.quantity + item.quantity, item.availableStock),
      };
      return persist(next);
    });
  }

  setQuantity(variantId: string, quantity: number): void {
    this.items.update((items) =>
      persist(
        items.map((item) =>
          item.variantId === variantId
            ? { ...item, quantity: clampQuantity(quantity, item.availableStock) }
            : item,
        ),
      ),
    );
  }

  remove(variantId: string): void {
    this.items.update((items) => persist(items.filter((item) => item.variantId !== variantId)));
  }

  clear(): void {
    this.items.set(persist([]));
  }

  reservePayload(): { items: Array<{ variantId: string; quantity: number }> } {
    return { items: this.items().map(({ variantId, quantity }) => ({ variantId, quantity })) };
  }

  saveCheckoutContext(context: CheckoutContext): void {
    storage()?.setItem(CHECKOUT_KEY, JSON.stringify(context));
    this.activeCheckout.set(context);
  }

  checkoutContext(): CheckoutContext | null {
    return this.activeCheckout();
  }

  clearCheckoutContext(): void {
    storage()?.removeItem(CHECKOUT_KEY);
    this.activeCheckout.set(null);
  }
}

function restoreCheckoutContext(): CheckoutContext | null {
  const raw = storage()?.getItem(CHECKOUT_KEY);
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<CheckoutContext>;
    if (!isUuid(value.orderId ?? '')) return null;
    return {
      orderId: value.orderId!,
      status: isOrderStatus(value.status) ? value.status : 'AWAITING_PAYMENT',
      reservationExpiresAt: value.reservationExpiresAt ?? null,
    };
  } catch {
    return null;
  }
}

function restoreCart(): CartItem[] {
  const raw = storage()?.getItem(CART_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as StoredCart;
    if (parsed.version !== 1 || !Array.isArray(parsed.items)) return persist([]);
    return parsed.items.filter(isCartItem).map((item) => ({
      ...item,
      quantity: clampQuantity(item.quantity, item.availableStock),
    }));
  } catch {
    return persist([]);
  }
}

function persist(items: CartItem[]): CartItem[] {
  storage()?.setItem(CART_KEY, JSON.stringify({ version: 1, items } satisfies StoredCart));
  return items;
}

function clampQuantity(quantity: number, availableStock: number): number {
  return Math.max(1, Math.min(Math.floor(quantity || 1), Math.max(1, availableStock)));
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as CartItem;
  return (
    typeof item.variantId === 'string' &&
    typeof item.productId === 'string' &&
    typeof item.productSlug === 'string' &&
    typeof item.productName === 'string' &&
    typeof item.variantName === 'string' &&
    typeof item.sku === 'string' &&
    typeof item.unitPriceInCents === 'number' &&
    typeof item.quantity === 'number' &&
    typeof item.availableStock === 'number'
  );
}

function storage(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function isOrderStatus(value: unknown): value is PublicOrderStatus {
  return value === 'AWAITING_PAYMENT' || value === 'PAYMENT_PENDING' || value === 'PAID' || value === 'EXPIRED' || value === 'CANCELLED' || value === 'REFUNDED';
}
