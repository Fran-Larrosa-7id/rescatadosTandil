import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize, switchMap, tap } from 'rxjs';
import { AppFooterComponent } from '../../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../../shared/components/bottom-navigation/bottom-navigation.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CartStore } from '../../core/cart.store';
import { formatArsFromCents } from '../../core/money.util';
import { PublicCommerceApiService } from '../../core/public-commerce-api.service';

type CheckoutState =
  | 'IDLE'
  | 'RESERVING'
  | 'RESERVED'
  | 'CREATING_PREFERENCE'
  | 'REDIRECTING'
  | 'ERROR';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink, AppHeaderComponent, AppFooterComponent, BottomNavigationComponent, IconComponent],
  template: `
    <app-header />
    <main id="contenido" class="mx-auto max-w-6xl px-4 py-8 pb-28 sm:px-6 sm:py-10 lg:px-8">
      <h1 class="text-4xl font-black">Tu carrito</h1>
      @if (cart.items().length) {
        <section class="mt-7 grid gap-8 lg:grid-cols-[1fr_24rem]">
          <div class="divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 sm:px-5">
            @for (item of cart.items(); track item.variantId) {
              <article class="grid grid-cols-[4.75rem_1fr] gap-x-4 gap-y-2 py-4 sm:grid-cols-[5rem_1fr_auto] sm:items-center">
                <div class="size-20 overflow-hidden rounded-xl bg-[var(--color-surface)]">
                  @if (item.imageUrl) {
                    <img class="h-full w-full object-cover" [src]="item.imageUrl" [alt]="item.productName" loading="lazy" />
                  }
                </div>
                <div>
                  <h2 class="text-lg font-black">{{ item.productName }}</h2>
                  <p class="mt-1 text-sm font-bold text-[var(--color-text-muted)]">{{ item.variantName }}</p>
                  <button class="mt-2 grid size-10 place-items-center rounded-lg text-[var(--color-text-muted)] transition hover:bg-[var(--color-danger-bg)] hover:text-[#bd2944]" type="button" [attr.aria-label]="'Eliminar ' + item.productName + ', variante ' + item.variantName" (click)="cart.remove(item.variantId)">
                    <app-icon name="trash" class="size-4" />
                  </button>
                </div>
                <div class="col-span-2 mt-1 flex items-center justify-between gap-5 sm:col-span-1 sm:mt-0 sm:justify-end">
                  <div class="inline-flex items-center rounded-xl border border-[var(--color-border)] p-1">
                    <button class="grid size-9 place-items-center rounded-lg hover:bg-[var(--color-recovering-bg)]" type="button" aria-label="Disminuir cantidad" (click)="cart.setQuantity(item.variantId, item.quantity - 1)"><app-icon name="minus" class="size-4" /></button>
                    <span class="min-w-8 text-center font-black">{{ item.quantity }}</span>
                    <button class="grid size-9 place-items-center rounded-lg hover:bg-[var(--color-recovering-bg)]" type="button" aria-label="Aumentar cantidad" (click)="cart.setQuantity(item.variantId, item.quantity + 1)"><app-icon name="plus" class="size-4" /></button>
                  </div>
                  <div class="text-right">
                    @if (item.quantity > 1) { <span class="block text-xs text-[var(--color-text-muted)]">{{ item.quantity }} × {{ money(item.unitPriceInCents) }}</span> }
                    <strong>{{ money(item.unitPriceInCents * item.quantity) }}</strong>
                  </div>
                </div>
              </article>
            }
          </div>

          <aside class="h-max rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 lg:sticky lg:top-5">
            <p class="text-sm font-extrabold uppercase tracking-wide text-[var(--color-accent)]">Resumen</p>
            <div class="flex justify-between text-lg">
              <span>Subtotal</span>
              <strong>{{ money(cart.subtotalInCents()) }}</strong>
            </div>
            <p class="mt-3 text-sm text-[var(--color-text-muted)]">
              <app-icon name="info" class="mr-1 inline size-4 align-text-bottom" /> El stock se reserva cuando iniciás el pago.
            </p>
            <section class="mt-6 border-t border-[var(--color-border)] pt-5">
              <p class="text-base font-black">Datos para coordinar el retiro</p>
              <p class="mt-1 text-sm font-bold text-[var(--color-accent)]">Retiro coordinado</p>
              <p class="mt-2 text-sm text-[var(--color-text-muted)]">Una vez confirmado el pago, nos comunicaremos con vos para coordinar el retiro.</p>
              <div class="mt-4 grid gap-3">
                <label class="grid gap-1 text-sm font-bold">Nombre y apellido *
                  <input class="rounded-xl border border-[var(--color-border)] px-3 py-2 font-normal" [(ngModel)]="customer.name" name="customerName" autocomplete="name" />
                </label>
                <label class="grid gap-1 text-sm font-bold">Email *
                  <input class="rounded-xl border border-[var(--color-border)] px-3 py-2 font-normal" [(ngModel)]="customer.email" name="customerEmail" type="email" autocomplete="email" />
                </label>
                <label class="grid gap-1 text-sm font-bold">Teléfono / WhatsApp *
                  <input class="rounded-xl border border-[var(--color-border)] px-3 py-2 font-normal" [(ngModel)]="customer.phone" name="customerPhone" type="tel" autocomplete="tel" />
                </label>
                <label class="grid gap-1 text-sm font-bold">Nota opcional
                  <textarea class="min-h-20 rounded-xl border border-[var(--color-border)] px-3 py-2 font-normal" [(ngModel)]="customer.note" name="fulfillmentNote"></textarea>
                </label>
              </div>
              <p class="mt-3 text-xs text-[var(--color-text-muted)]">Usaremos estos datos únicamente para coordinar tu pedido.</p>
              @if (customerError()) {
                <p class="mt-3 rounded-xl bg-[var(--color-danger-bg)] p-3 text-sm font-bold" role="alert">{{ customerError() }}</p>
              }
            </section>
            @if (message()) {
              <p class="mt-4 rounded-xl bg-[var(--color-danger-bg)] p-3 font-bold" role="alert">{{ message() }}</p>
            }
            @if (reservationText()) {
              <p class="mt-4 rounded-xl bg-[#e7f6eb] p-3 font-bold text-[#23623a]">{{ reservationText() }}</p>
            }
            @if (pendingCheckout(); as pending) {
              <section class="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4" aria-live="polite">
                <p class="font-black">Tenés un pago en proceso</p>
                <p class="mt-2 text-sm text-[var(--color-text-muted)]">Estamos esperando la confirmación de Mercado Pago para el pedido #{{ pending.orderId.slice(0, 8) }}.</p>
                <a class="mt-4 inline-flex min-h-11 items-center rounded-full border border-[var(--color-border)] px-4 text-sm font-extrabold" routerLink="/checkout/pending">Consultar estado del pago</a>
              </section>
            } @else {
              <button
                class="button-primary mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 font-extrabold disabled:opacity-50"
                type="button"
                [disabled]="state() !== 'IDLE' && state() !== 'ERROR'"
                (click)="checkout()"
              >
                <app-icon name="arrow" class="size-4" /> {{ ctaLabel() }}
              </button>
            }
          </aside>
        </section>
      } @else {
        <div class="surface-card mx-auto mt-8 max-w-md rounded-3xl border p-7 text-center">
          <span class="mx-auto grid size-14 place-items-center rounded-2xl bg-[var(--color-recovering-bg)] text-[var(--color-accent)]"><app-icon name="shop" class="size-7" /></span>
          <p class="mt-4 text-lg font-black">Todavía no agregaste productos.</p>
          <a class="button-primary mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl px-6 font-extrabold" routerLink="/tienda"><app-icon name="shop" class="size-5" /> Ver tienda</a>
        </div>
      }
    </main>
    <app-footer />
    <app-bottom-navigation />
  `,
})
export class CartPageComponent {
  readonly state = signal<CheckoutState>('IDLE');
  readonly message = signal('');
  readonly reservationText = signal('');
  readonly customerError = signal('');
  readonly pendingCheckout = computed(() => {
    const checkout = this.cart.activeCheckout();
    return checkout?.status === 'AWAITING_PAYMENT' || checkout?.status === 'PAYMENT_PENDING'
      ? checkout
      : null;
  });
  customer = { name: '', email: '', phone: '', note: '' };
  private attemptKey: string | null = null;

  constructor(
    readonly cart: CartStore,
    private readonly api: PublicCommerceApiService,
  ) {}

  checkout(): void {
    if (!this.cart.items().length || this.pendingCheckout() || this.state() === 'RESERVING' || this.state() === 'CREATING_PREFERENCE') return;
    this.message.set('');
    this.reservationText.set('');
    this.customerError.set('');
    const customer = this.validCustomer();
    if (!customer) return;
    this.attemptKey = crypto.randomUUID();
    this.state.set('RESERVING');
    this.api
      .reserve({
        ...this.cart.reservePayload(),
        customer: { name: customer.name, email: customer.email, phone: customer.phone },
        fulfillment: { method: 'PICKUP', note: customer.note || null },
      }, this.attemptKey)
      .pipe(
        tap((order) => {
          this.state.set('RESERVED');
          this.cart.saveCheckoutContext({
            orderId: order.orderId,
            status: 'AWAITING_PAYMENT',
            reservationExpiresAt: order.reservationExpiresAt,
          });
          this.reservationText.set(`Tu stock está reservado temporalmente.`);
        }),
        tap(() => this.state.set('CREATING_PREFERENCE')),
        switchMap((order) => this.api.createMercadoPagoPreference(order.orderId)),
        finalize(() => {
          if (this.state() !== 'REDIRECTING' && this.state() !== 'ERROR') this.state.set('IDLE');
        }),
      )
      .subscribe({
        next: (preference) => {
          this.state.set('REDIRECTING');
          this.redirectTo(preference.initPoint);
        },
        error: () => {
          this.state.set('ERROR');
          this.message.set('Algunos productos cambiaron de disponibilidad mientras comprabas. Revisá el carrito para continuar.');
        },
      });
  }

  ctaLabel(): string {
    return {
      IDLE: 'Finalizar compra',
      RESERVING: 'Reservando productos...',
      RESERVED: 'Stock reservado',
      CREATING_PREFERENCE: 'Preparando Mercado Pago...',
      REDIRECTING: 'Te estamos llevando a Mercado Pago...',
      ERROR: 'Intentar nuevamente',
    }[this.state()];
  }

  money(value: number): string {
    return formatArsFromCents(value);
  }

  private validCustomer(): { name: string; email: string; phone: string; note: string } | null {
    const customer = {
      name: this.customer.name.trim(),
      email: this.customer.email.trim(),
      phone: this.customer.phone.trim(),
      note: this.customer.note.trim(),
    };
    if (customer.name.length < 2) {
      this.customerError.set('Ingresá tu nombre y apellido.');
      return null;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      this.customerError.set('Ingresá un email válido.');
      return null;
    }
    if (!customer.phone) {
      this.customerError.set('Ingresá un teléfono o WhatsApp.');
      return null;
    }
    return customer;
  }

  protected redirectTo(initPoint: string): void {
    window.location.assign(initPoint);
  }
}
