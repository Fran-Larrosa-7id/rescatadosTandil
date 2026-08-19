import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AppFooterComponent } from '../../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../../shared/components/bottom-navigation/bottom-navigation.component';
import { CartStore } from '../../core/cart.store';
import { PublicOrderStatus, PublicOrderStatusResponse } from '../../core/commerce.models';
import { PublicCommerceApiService } from '../../core/public-commerce-api.service';

const TERMINAL: PublicOrderStatus[] = ['PAID', 'EXPIRED', 'CANCELLED', 'REFUNDED'];
const MAX_ATTEMPTS = 10;

@Component({
  standalone: true,
  imports: [RouterLink, AppHeaderComponent, AppFooterComponent, BottomNavigationComponent],
  template: `
    <app-header />
    <main id="contenido" class="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:px-8" aria-live="polite">
      <p class="text-sm font-extrabold uppercase tracking-wide text-[var(--color-accent)]">Checkout</p>
      <h1 class="mt-3 text-4xl font-black">{{ title() }}</h1>
      <p class="mt-4 text-lg text-[var(--color-text-muted)]">{{ description() }}</p>

      @if (orderId()) {
        <p class="mt-6 font-bold">Pedido #{{ orderId()!.slice(0, 8) }}</p>
      }

      @if (error()) {
        <p class="mt-6 rounded-2xl border border-[var(--color-border)] p-4 font-bold" role="alert">{{ error() }}</p>
      }

      <div class="mt-8 flex flex-wrap justify-center gap-3">
        @if (canConsult()) {
          <button class="button-primary rounded-full px-6 py-3 font-extrabold" type="button" (click)="consult(true)">
            Consultar estado
          </button>
        }
        @if (canRetryPayment()) {
          <button class="button-primary rounded-full px-6 py-3 font-extrabold" type="button" (click)="retryPayment()">
            Intentar pagar nuevamente
          </button>
        }
        <a class="rounded-full border border-[var(--color-border)] px-6 py-3 font-extrabold" routerLink="/carrito">
          Volver al carrito
        </a>
        <a class="rounded-full border border-[var(--color-border)] px-6 py-3 font-extrabold" routerLink="/tienda">
          Ver tienda
        </a>
      </div>
    </main>
    <app-footer />
    <app-bottom-navigation />
  `,
})
export class CheckoutStatusPageComponent implements OnInit, OnDestroy {
  readonly status = signal<PublicOrderStatus | null>(null);
  readonly orderId = signal<string | null>(null);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly canConsult = signal(false);
  private attempts = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: PublicCommerceApiService,
    private readonly cart: CartStore,
  ) {}

  ngOnInit(): void {
    const query = this.route.snapshot.queryParamMap;
    const externalReference = query.get('external_reference');
    const context = this.cart.checkoutContext();
    const orderId = isUuid(externalReference ?? '') ? externalReference : context?.orderId ?? null;
    this.orderId.set(orderId);
    if (!orderId) {
      this.error.set('No encontramos un pedido válido para consultar.');
      this.canConsult.set(false);
      return;
    }
    this.consult(false);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  consult(manual: boolean): void {
    const orderId = this.orderId();
    if (!orderId) return;
    if (manual) this.attempts = 0;
    this.loading.set(true);
    this.error.set('');
    this.canConsult.set(false);
    this.api
      .orderStatus(orderId)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => this.handleStatus(response),
        error: () => {
          this.error.set('No pudimos consultar el estado del pedido.');
          this.canConsult.set(true);
        },
      });
  }

  retryPayment(): void {
    const orderId = this.orderId();
    if (!orderId) return;
    this.loading.set(true);
    this.api
      .createMercadoPagoPreference(orderId)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (preference) => window.location.assign(preference.initPoint),
        error: () => this.error.set('No pudimos preparar un nuevo intento de pago.'),
      });
  }

  title(): string {
    if (this.loading() && !this.status()) return 'Confirmando tu pago...';
    switch (this.status()) {
      case 'PAID':
        return 'Pago confirmado';
      case 'PAYMENT_PENDING':
      case 'AWAITING_PAYMENT':
        return routeKind(this.route) === 'pending' ? 'Tu pago está pendiente' : 'Estamos confirmando tu pago';
      case 'EXPIRED':
        return 'La reserva venció';
      case 'CANCELLED':
        return 'Pedido cancelado';
      case 'REFUNDED':
        return 'Pedido reembolsado';
      default:
        return routeKind(this.route) === 'failure'
          ? 'No pudimos completar el flujo de pago'
          : 'Confirmando tu pago...';
    }
  }

  description(): string {
    switch (this.status()) {
      case 'PAID':
        return 'Gracias por ser parte del cambio. Tu compra ayuda a seguir sosteniendo tratamientos, alimento y cuidados.';
      case 'PAYMENT_PENDING':
      case 'AWAITING_PAYMENT':
        return 'Todavía no recibimos una confirmación definitiva. Vamos a seguir consultando el backend.';
      case 'EXPIRED':
        return 'El carrito queda disponible para intentar una compra nueva con stock actualizado.';
      case 'CANCELLED':
        return 'El pedido ya no está activo.';
      case 'REFUNDED':
        return 'El backend marcó este pedido como reembolsado.';
      default:
        return routeKind(this.route) === 'failure'
          ? 'Vamos a verificar el estado real de tu pedido.'
          : 'No usamos los parámetros de Mercado Pago para confirmar el cobro.';
    }
  }

  canRetryPayment(): boolean {
    return this.status() === 'AWAITING_PAYMENT' || this.status() === 'PAYMENT_PENDING';
  }

  private handleStatus(response: PublicOrderStatusResponse): void {
    this.status.set(response.status);
    this.orderId.set(response.orderId);
    if (response.status === 'PAID') {
      this.cart.clear();
      this.cart.clearCheckoutContext();
    }
    if (response.status === 'EXPIRED') this.cart.clearCheckoutContext();
    if (TERMINAL.includes(response.status)) {
      this.canConsult.set(false);
      return;
    }
    if (++this.attempts >= MAX_ATTEMPTS) {
      this.canConsult.set(true);
      return;
    }
    this.timer = setTimeout(() => this.consult(false), 3000);
  }
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function routeKind(route: ActivatedRoute): 'success' | 'pending' | 'failure' {
  const path = route.snapshot.routeConfig?.path ?? '';
  if (path.includes('pending')) return 'pending';
  if (path.includes('failure')) return 'failure';
  return 'success';
}
