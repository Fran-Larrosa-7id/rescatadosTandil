import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, concat, EMPTY, exhaustMap, finalize, of, Subscription, takeUntil, takeWhile, timer } from 'rxjs';
import { AppFooterComponent } from '../../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../../shared/components/bottom-navigation/bottom-navigation.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CartStore } from '../../core/cart.store';
import { PublicOrderStatus, PublicOrderStatusResponse } from '../../core/commerce.models';
import { PublicCommerceApiService } from '../../core/public-commerce-api.service';

const TERMINAL: PublicOrderStatus[] = ['PAID', 'EXPIRED', 'CANCELLED', 'REFUNDED'];
const POLLING_INTERVAL_MS = 5_000;
const POLLING_TIMEOUT_MS = 120_000;

@Component({
  standalone: true,
  imports: [RouterLink, AppHeaderComponent, AppFooterComponent, BottomNavigationComponent, IconComponent],
  template: `
    <app-header />
    <main id="contenido" class="relative isolate overflow-hidden px-4 py-12 sm:px-6 sm:py-20" aria-live="polite">
      <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-accent)_20%,transparent),transparent_38%)]"></div>
      <div class="pointer-events-none absolute -left-20 top-20 -z-10 size-56 rounded-full bg-[var(--color-recovering-bg)] opacity-45 blur-3xl"></div>
      <div class="pointer-events-none absolute -right-20 bottom-8 -z-10 size-64 rounded-full bg-[var(--color-surface-strong)] opacity-40 blur-3xl"></div>

      <section class="surface-elevated mx-auto max-w-xl rounded-[2rem] border p-6 text-center shadow-[0_24px_70px_rgba(31,24,37,0.18)] sm:p-10">
        <div
          class="mx-auto grid size-18 place-items-center rounded-full shadow-lg"
          [class.bg-[#19ae5c]]="status() === 'PAID'"
          [class.bg-[var(--color-accent)]]="status() !== 'PAID'"
          [class.text-white]="true"
        >
          @if (status() === 'PAID') {
            <app-icon name="check" class="size-9" />
          } @else if (status() === 'EXPIRED' || status() === 'CANCELLED' || status() === 'REFUNDED') {
            <app-icon name="info" class="size-8" />
          } @else {
            <app-icon name="clock" class="size-8" />
          }
        </div>

        <p class="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--color-accent)]">Estado del checkout</p>
        <h1 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{{ title() }}</h1>
        <p class="mx-auto mt-4 max-w-md text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">{{ description() }}</p>

        @if (orderId()) {
          <div class="mt-7 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-4 text-left">
            <p class="text-xs font-extrabold uppercase tracking-wider text-[var(--color-text-muted)]">Pedido</p>
            <p class="mt-1 text-lg font-black">#{{ orderId()!.slice(0, 8) }}</p>
            @if (status() === 'PAID') {
              <p class="mt-1 text-sm font-bold text-[#18874c]">Pago verificado · retiro a coordinar</p>
            }
          </div>
        }

        @if (error()) {
          <p class="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-danger-bg)] p-4 text-left font-bold" role="alert">{{ error() }}</p>
        }

        <div class="mt-8 grid gap-3 sm:grid-cols-2">
          @if (isPending() && !pollingTimedOut()) {
            <div class="sm:col-span-2 flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 text-left">
              <span class="relative grid size-11 shrink-0 place-items-center" aria-hidden="true">
                <span class="absolute inset-0 rounded-full border-2 border-[color-mix(in_srgb,var(--color-accent)_26%,transparent)]"></span>
                <span class="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[var(--color-accent)] border-r-[var(--color-accent)]"></span>
                <app-icon name="clock" class="size-4 text-[var(--color-accent)]" />
              </span>
              <p class="text-sm font-semibold leading-6 text-[var(--color-text-muted)]">Confirmando con Mercado Pago. Si ya completaste el pago, no vuelvas a pagarlo.</p>
            </div>
          }
          @if (isPending() && pollingTimedOut()) {
            <div class="sm:col-span-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-left">
              <p class="text-sm font-semibold leading-6 text-[var(--color-text-muted)]">La confirmación está demorando más de lo habitual. Podés consultar nuevamente el estado.</p>
              <button class="button-primary mt-4 min-h-11 rounded-xl px-5 font-extrabold" type="button" [disabled]="loading()" (click)="consult()">
                Consultar estado
              </button>
            </div>
          }
          <a class="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--color-border)] px-5 font-extrabold transition hover:border-[var(--color-accent)]" routerLink="/tienda">
            {{ isPending() ? 'Volver a la tienda' : 'Seguir comprando' }}
          </a>
          @if (!isPending()) {
            <a class="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--color-border)] px-5 font-extrabold transition hover:border-[var(--color-accent)]" routerLink="/carrito">Ver carrito</a>
          }
        </div>
      </section>
    </main>
    <app-footer />
    <app-bottom-navigation />
  `,
})
export class CheckoutStatusPageComponent implements OnInit {
  readonly status = signal<PublicOrderStatus | null>(null);
  readonly orderId = signal<string | null>(null);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly pollingTimedOut = signal(false);
  private pollingSubscription: Subscription | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: PublicCommerceApiService,
    private readonly cart: CartStore,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    const query = this.route.snapshot.queryParamMap;
    const externalReference = query.get('external_reference');
    const context = this.cart.checkoutContext();
    const orderId = isUuid(externalReference ?? '') ? externalReference : context?.orderId ?? null;
    this.orderId.set(orderId);
    if (!orderId) {
      this.error.set('No encontramos un pedido válido para consultar.');
      return;
    }
    this.startPolling(orderId);
  }

  consult(): void {
    const orderId = this.orderId();
    if (!orderId || this.loading()) return;

    this.checkStatus(orderId, false).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => this.handleStatus(response),
    });
  }

  title(): string {
    if (this.loading() && !this.status()) return 'Confirmando tu pago...';
    switch (this.status()) {
      case 'PAID':
        return 'Pago confirmado';
      case 'PAYMENT_PENDING':
      case 'AWAITING_PAYMENT':
        return 'Estamos confirmando tu pago';
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
        return 'Gracias por ser parte del cambio. Vamos a comunicarnos con vos para coordinar el retiro de tu pedido.';
      case 'PAYMENT_PENDING':
      case 'AWAITING_PAYMENT':
        return 'Esto puede demorar unos instantes. No necesitás volver a realizar el pago.';
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

  isPending(): boolean {
    return this.status() === 'AWAITING_PAYMENT' || this.status() === 'PAYMENT_PENDING';
  }

  private startPolling(orderId: string): void {
    this.pollingSubscription?.unsubscribe();
    this.pollingTimedOut.set(false);

    this.pollingSubscription = concat(of(0), timer(POLLING_INTERVAL_MS, POLLING_INTERVAL_MS))
      .pipe(
        takeUntil(timer(POLLING_TIMEOUT_MS)),
        exhaustMap(() => this.checkStatus(orderId, true)),
        takeWhile((response) => !TERMINAL.includes(response.status), true),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          if (this.isPending() && !TERMINAL.includes(this.status()!)) {
            this.pollingTimedOut.set(true);
          }
          this.pollingSubscription = null;
        }),
      )
      .subscribe({ next: (response) => this.handleStatus(response) });
  }

  private checkStatus(orderId: string, willRetryAutomatically: boolean) {
    this.loading.set(true);
    this.error.set('');
    return this.api.orderStatus(orderId).pipe(
      finalize(() => this.loading.set(false)),
      catchError(() => {
        this.error.set(
          willRetryAutomatically
            ? 'No pudimos consultar el estado del pedido. Vamos a intentar nuevamente.'
            : 'No pudimos consultar el estado del pedido. Podés intentarlo nuevamente.',
        );
        return EMPTY;
      }),
    );
  }

  private handleStatus(response: PublicOrderStatusResponse): void {
    this.status.set(response.status);
    this.orderId.set(response.orderId);

    if (this.isPending()) {
      this.cart.saveCheckoutContext({
        orderId: response.orderId,
        status: response.status,
        reservationExpiresAt: response.reservationExpiresAt,
      });
      return;
    }

    if (response.status === 'PAID') {
      this.cart.clear();
      this.cart.clearCheckoutContext();
      return;
    }

    this.cart.clearCheckoutContext();
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
