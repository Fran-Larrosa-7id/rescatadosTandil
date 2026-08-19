import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize, switchMap, tap } from 'rxjs';
import { AppFooterComponent } from '../../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../../shared/components/bottom-navigation/bottom-navigation.component';
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
  imports: [RouterLink, AppHeaderComponent, AppFooterComponent, BottomNavigationComponent],
  template: `
    <app-header />
    <main id="contenido" class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-black">Tu carrito</h1>
      @if (cart.items().length) {
        <section class="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem]">
          <div class="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            @for (item of cart.items(); track item.variantId) {
              <article class="grid gap-4 py-5 sm:grid-cols-[5rem_1fr_auto] sm:items-center">
                <div class="size-20 overflow-hidden rounded-xl bg-[var(--color-surface)]">
                  @if (item.imageUrl) {
                    <img class="h-full w-full object-cover" [src]="item.imageUrl" [alt]="item.productName" loading="lazy" />
                  }
                </div>
                <div>
                  <h2 class="text-lg font-black">{{ item.productName }}</h2>
                  <p class="text-sm text-[var(--color-text-muted)]">{{ item.variantName }} · {{ item.sku }}</p>
                  <button class="mt-2 text-sm font-bold text-[var(--color-accent)]" type="button" (click)="cart.remove(item.variantId)">
                    Eliminar
                  </button>
                </div>
                <div class="flex items-center justify-between gap-5 sm:justify-end">
                  <div class="flex items-center gap-2">
                    <button class="rounded-full border border-[var(--color-border)] px-3 py-1" type="button" aria-label="Disminuir cantidad" (click)="cart.setQuantity(item.variantId, item.quantity - 1)">-</button>
                    <span class="min-w-7 text-center font-black">{{ item.quantity }}</span>
                    <button class="rounded-full border border-[var(--color-border)] px-3 py-1" type="button" aria-label="Aumentar cantidad" (click)="cart.setQuantity(item.variantId, item.quantity + 1)">+</button>
                  </div>
                  <strong>{{ money(item.unitPriceInCents * item.quantity) }}</strong>
                </div>
              </article>
            }
          </div>

          <aside class="h-max border-t border-[var(--color-border)] pt-5">
            <div class="flex justify-between text-lg">
              <span>Subtotal</span>
              <strong>{{ money(cart.subtotalInCents()) }}</strong>
            </div>
            <p class="mt-3 text-sm text-[var(--color-text-muted)]">
              El stock se reserva recién al iniciar el pago.
            </p>
            @if (message()) {
              <p class="mt-4 rounded-xl bg-[var(--color-danger-bg)] p-3 font-bold" role="alert">{{ message() }}</p>
            }
            @if (reservationText()) {
              <p class="mt-4 rounded-xl bg-[#e7f6eb] p-3 font-bold text-[#23623a]">{{ reservationText() }}</p>
            }
            <button
              class="button-primary mt-6 min-h-12 w-full rounded-full px-6 font-extrabold disabled:opacity-50"
              type="button"
              [disabled]="state() !== 'IDLE' && state() !== 'ERROR'"
              (click)="checkout()"
            >
              {{ ctaLabel() }}
            </button>
          </aside>
        </section>
      } @else {
        <div class="mt-8 rounded-2xl border border-[var(--color-border)] p-8">
          <p class="text-xl font-black">Tu carrito está vacío.</p>
          <a class="button-primary mt-5 inline-flex rounded-full px-6 py-3 font-extrabold" routerLink="/tienda">Ver tienda</a>
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
  private attemptKey: string | null = null;

  constructor(
    readonly cart: CartStore,
    private readonly api: PublicCommerceApiService,
  ) {}

  checkout(): void {
    if (!this.cart.items().length || this.state() === 'RESERVING' || this.state() === 'CREATING_PREFERENCE') return;
    this.message.set('');
    this.reservationText.set('');
    this.attemptKey = crypto.randomUUID();
    this.state.set('RESERVING');
    this.api
      .reserve(this.cart.reservePayload(), this.attemptKey)
      .pipe(
        tap((order) => {
          this.state.set('RESERVED');
          this.cart.saveCheckoutContext({
            orderId: order.orderId,
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

  protected redirectTo(initPoint: string): void {
    window.location.assign(initPoint);
  }
}
