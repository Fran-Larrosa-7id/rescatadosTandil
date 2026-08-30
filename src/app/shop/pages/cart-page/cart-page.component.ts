import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize, switchMap, tap } from 'rxjs';
import { AppFooterComponent } from '../../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../../shared/components/bottom-navigation/bottom-navigation.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';
import { CartStore } from '../../core/cart.store';
import { formatArsFromCents } from '../../core/money.util';
import { PublicCommerceApiService } from '../../core/public-commerce-api.service';

type CheckoutState =
  'IDLE' | 'RESERVING' | 'RESERVED' | 'CREATING_PREFERENCE' | 'REDIRECTING' | 'ERROR';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    AppHeaderComponent,
    AppFooterComponent,
    BottomNavigationComponent,
    IconComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <div class="flex min-h-dvh flex-col">
      <app-header />
      <main
        id="contenido"
        class="cart-page relative isolate flex w-full max-w-none flex-1 flex-col overflow-hidden px-4 py-8 pb-28 sm:px-6 sm:py-10 lg:px-8"
      >
        <img
          src="images/extra/paw.png"
          alt=""
          aria-hidden="true"
          class="cart-decor cart-decor-paw cart-decor-paw--top-right"
        />
        <img
          src="images/extra/paw.png"
          alt=""
          aria-hidden="true"
          class="cart-decor cart-decor-paw cart-decor-paw--bottom-left hidden lg:block"
        />
        <img
          src="images/extra/paw.png"
          alt=""
          aria-hidden="true"
          class="cart-decor cart-decor-paw cart-decor-paw--middle-right hidden lg:block"
        />
        <img
          src="images/extra/corazoncito-empty.png"
          alt=""
          aria-hidden="true"
          class="cart-decor cart-decor-heart cart-decor-heart--left hidden lg:block"
        />
        <img
          src="images/extra/corazon-lleno.png"
          alt=""
          aria-hidden="true"
          class="cart-decor cart-decor-heart cart-decor-heart--top"
        />
        <span aria-hidden="true" class="cart-decor cart-dots cart-dots--top"></span>
        <span
          aria-hidden="true"
          class="cart-decor cart-dots cart-dots--right hidden lg:block"
        ></span>
        <div class="cart-content relative z-10 mx-auto w-full max-w-7xl">
          <h1 appReveal class="cart-title text-4xl font-black">Tu carrito</h1>
          @if (cart.items().length) {
            <section
              class="cart-layout mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(25rem,.9fr)]"
            >
              <div
                class="cart-items divide-y divide-[var(--color-border)] rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] px-5 shadow-[0_14px_34px_rgba(58,45,72,0.1)] dark-neon-card sm:px-6"
              >
                @for (item of cart.items(); track item.variantId) {
                  <article
                    appReveal="up"
                    [appRevealDelay]="$index * 70"
                    class="cart-item grid grid-cols-[5.5rem_1fr] gap-x-5 gap-y-2 py-5 sm:grid-cols-[6.5rem_1fr_auto] sm:items-center"
                  >
                    <div
                      class="size-[5.5rem] overflow-hidden rounded-2xl bg-[var(--color-surface)] sm:size-[6.5rem]"
                    >
                      @if (item.imageUrl) {
                        <img
                          class="h-full w-full object-cover"
                          [src]="item.imageUrl"
                          [alt]="item.productName"
                          loading="lazy"
                        />
                      }
                    </div>
                    <div>
                      <h2 class="text-lg font-black">{{ item.productName }}</h2>
                      <p class="mt-1 text-sm font-bold text-[var(--color-text-muted)]">
                        {{ item.variantName }}
                      </p>
                      <button
                        class="mt-2 inline-flex items-center gap-2 rounded-lg px-1 py-1 text-sm font-bold text-[var(--color-accent)] transition hover:bg-[var(--color-danger-bg)] hover:text-[#bd2944]"
                        type="button"
                        [attr.aria-label]="
                          'Eliminar ' + item.productName + ', variante ' + item.variantName
                        "
                        (click)="cart.remove(item.variantId)"
                      >
                        <app-icon name="trash" class="size-4" /> Eliminar
                      </button>
                    </div>
                    <div
                      class="col-span-2 mt-1 flex items-center justify-between gap-5 sm:col-span-1 sm:mt-0 sm:justify-end"
                    >
                      <div
                        class="inline-flex items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-1"
                      >
                        <button
                          class="grid size-9 place-items-center rounded-lg hover:bg-[var(--color-recovering-bg)]"
                          type="button"
                          aria-label="Disminuir cantidad"
                          (click)="cart.setQuantity(item.variantId, item.quantity - 1)"
                        >
                          <app-icon name="minus" class="size-4" />
                        </button>
                        <span class="min-w-8 text-center font-black">{{ item.quantity }}</span>
                        <button
                          class="grid size-9 place-items-center rounded-lg hover:bg-[var(--color-recovering-bg)]"
                          type="button"
                          aria-label="Aumentar cantidad"
                          (click)="cart.setQuantity(item.variantId, item.quantity + 1)"
                        >
                          <app-icon name="plus" class="size-4" />
                        </button>
                      </div>
                      <div class="text-right">
                        @if (item.quantity > 1) {
                          <span class="block text-xs text-[var(--color-text-muted)]"
                            >{{ item.quantity }} × {{ money(item.unitPriceInCents) }}</span
                          >
                        }
                        <strong>{{ money(item.unitPriceInCents * item.quantity) }}</strong>
                      </div>
                    </div>
                  </article>
                }
              </div>

              <aside
                appReveal="right"
                [appRevealDelay]="100"
                class="cart-summary h-max rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[0_14px_34px_rgba(58,45,72,0.1)] dark-neon-card lg:sticky lg:top-5"
              >
                <p
                  class="text-sm font-extrabold uppercase tracking-wide text-[var(--color-accent)]"
                >
                  Resumen
                </p>
                <div class="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <strong>{{ money(cart.subtotalInCents()) }}</strong>
                </div>
                <p class="mt-3 text-sm text-[var(--color-text-muted)]">
                  <app-icon name="info" class="mr-1 inline size-4 align-text-bottom" /> El stock se
                  reserva cuando iniciás el pago.
                </p>
                <section class="mt-6 border-t border-[var(--color-border)] pt-5">
                  <p class="text-base font-black">Datos para coordinar el retiro</p>
                  <p class="mt-1 text-sm font-bold text-[var(--color-accent)]">Retiro coordinado</p>
                  <p class="mt-2 text-sm text-[var(--color-text-muted)]">
                    Una vez confirmado el pago, nos comunicaremos con vos para coordinar el retiro.
                  </p>
                  <div class="mt-4 grid gap-3">
                    <label class="grid gap-1 text-sm font-bold"
                      >Nombre y apellido *
                      <input
                        class="rounded-xl border border-[var(--color-border)] px-3 py-2 font-normal"
                        [(ngModel)]="customer.name"
                        name="customerName"
                        autocomplete="name"
                        placeholder="Ingresá tu nombre y apellido"
                      />
                    </label>
                    <label class="grid gap-1 text-sm font-bold"
                      >Email *
                      <input
                        class="rounded-xl border border-[var(--color-border)] px-3 py-2 font-normal"
                        [(ngModel)]="customer.email"
                        name="customerEmail"
                        type="email"
                        autocomplete="email"
                        placeholder="ejemplo@correo.com"
                      />
                    </label>
                    <label class="grid gap-1 text-sm font-bold"
                      >Teléfono / WhatsApp *
                      <input
                        class="rounded-xl border border-[var(--color-border)] px-3 py-2 font-normal"
                        [(ngModel)]="customer.phone"
                        name="customerPhone"
                        type="tel"
                        autocomplete="tel"
                        placeholder="11 1234 5678"
                      />
                    </label>
                    <label class="grid gap-1 text-sm font-bold"
                      >Nota opcional
                      <textarea
                        class="min-h-20 rounded-xl border border-[var(--color-border)] px-3 py-2 font-normal"
                        [(ngModel)]="customer.note"
                        name="fulfillmentNote"
                        placeholder="Dejanos cualquier detalle útil para el retiro..."
                      ></textarea>
                    </label>
                  </div>
                  <p class="mt-3 text-xs text-[var(--color-text-muted)]">
                    Usaremos estos datos únicamente para coordinar tu pedido.
                  </p>
                  @if (customerError()) {
                    <p
                      class="mt-3 rounded-xl bg-[var(--color-danger-bg)] p-3 text-sm font-bold"
                      role="alert"
                    >
                      {{ customerError() }}
                    </p>
                  }
                </section>
                @if (message()) {
                  <p class="mt-4 rounded-xl bg-[var(--color-danger-bg)] p-3 font-bold" role="alert">
                    {{ message() }}
                  </p>
                }
                @if (reservationText()) {
                  <p class="mt-4 rounded-xl bg-[#e7f6eb] p-3 font-bold text-[#23623a]">
                    {{ reservationText() }}
                  </p>
                }
                @if (pendingCheckout(); as pending) {
                  <section
                    class="cart-pending mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4"
                    aria-live="polite"
                  >
                    <p class="font-black">Tenés un pago en proceso</p>
                    <p class="mt-2 text-sm text-[var(--color-text-muted)]">
                      Estamos esperando la confirmación de Mercado Pago para el pedido #{{
                        pending.orderId.slice(0, 8)
                      }}.
                    </p>
                    <a
                      class="mt-4 inline-flex min-h-11 items-center rounded-full border border-[var(--color-border)] px-4 text-sm font-extrabold"
                      routerLink="/checkout/pending"
                      >Consultar estado del pago</a
                    >
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
            <div
              class="cart-empty-state surface-card mx-auto mt-8 max-w-md rounded-3xl border p-7 text-center"
            >
              <span
                class="mx-auto grid size-14 place-items-center rounded-2xl bg-[var(--color-recovering-bg)] text-[var(--color-accent)]"
                ><app-icon name="shop" class="size-7"
              /></span>
              <p class="mt-4 text-lg font-black text-center">Todavía no agregaste productos.</p>
              <a
                class="button-primary mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl px-6 font-extrabold"
                routerLink="/tienda"
                ><app-icon name="shop" class="size-5" /> Ver tienda</a
              >
            </div>
          }
        </div>
      </main>
      <app-footer />
    </div>
    <app-bottom-navigation />
  `,
  styles: `
    :host {
      display: block;
      min-height: 100dvh;
    }

    .cart-page {
      background:
        radial-gradient(
          circle at 6% 80%,
          color-mix(in srgb, var(--color-accent-soft) 52%, transparent),
          transparent 19rem
        ),
        radial-gradient(
          circle at 94% 30%,
          color-mix(in srgb, var(--color-accent-soft) 36%, transparent),
          transparent 20rem
        ),
        var(--color-bg);
    }

    .cart-decor {
      position: absolute;
      z-index: -1;
      pointer-events: none;
      user-select: none;
    }

    .cart-decor-paw {
      width: clamp(5.5rem, 8vw, 8rem);
      opacity: 0.22;
    }
    .cart-decor-paw--top-right {
      top: 8rem;
      right: clamp(2rem, 8vw, 10rem);
      transform: rotate(18deg);
    }
    .cart-decor-paw--middle-right {
      top: 43%;
      right: clamp(1.5rem, 4vw, 6rem);
      transform: rotate(-18deg);
    }
    .cart-decor-paw--bottom-left {
      bottom: 7rem;
      left: clamp(2rem, 5vw, 7rem);
      transform: rotate(22deg);
    }
    .cart-decor-heart {
      width: clamp(2.5rem, 4vw, 4rem);
      opacity: 0.34;
    }
    .cart-decor-heart--left {
      top: 17rem;
      left: clamp(2rem, 7vw, 9rem);
      transform: rotate(-18deg);
    }
    .cart-decor-heart--top {
      top: 7rem;
      left: 24%;
      transform: rotate(18deg);
    }
    .cart-dots {
      width: 10rem;
      aspect-ratio: 1;
      opacity: 0.32;
      background-image: radial-gradient(
        circle,
        color-mix(in srgb, var(--color-accent) 44%, transparent) 1.35px,
        transparent 1.65px
      );
      background-size: 0.8rem 0.8rem;
      mask-image: radial-gradient(circle, #000 20%, transparent 70%);
    }
    .cart-dots--top {
      top: 0.5rem;
      left: -2rem;
    }
    .cart-dots--right {
      top: 53%;
      right: -2rem;
    }

    .cart-layout {
      align-items: start;
    }
    .cart-items {
      min-height: 0;
    }
    .cart-item:first-child {
      padding-top: 1.7rem;
    }
    .cart-item:last-child {
      padding-bottom: 1.7rem;
    }
    .cart-summary {
      border: 0.8rem solid transparent;
      background:
        linear-gradient(
            145deg,
            color-mix(in srgb, var(--color-card) 93%, var(--color-accent-soft)),
            var(--color-card)
          )
          padding-box,
        linear-gradient(135deg, #ead8ff, #cf9cff 48%, #e7c8ff) border-box;
      box-shadow:
        0 0.9rem 2.1rem rgba(58, 45, 72, 0.1),
        inset 0 1px rgba(255, 255, 255, 0.6);
    }
    .cart-summary input,
    .cart-summary textarea {
      background: color-mix(in srgb, var(--color-card) 94%, var(--color-surface));
    }
    .cart-summary input::placeholder,
    .cart-summary textarea::placeholder {
      color: color-mix(in srgb, var(--color-text-muted) 62%, transparent);
    }
    .cart-pending {
      background: linear-gradient(
        125deg,
        var(--color-accent-soft),
        color-mix(in srgb, var(--color-accent-soft) 46%, var(--color-card))
      );
    }

    :host-context(.dark) .cart-page {
      background:
        radial-gradient(circle at 6% 80%, rgba(153, 94, 220, 0.15), transparent 19rem),
        radial-gradient(circle at 94% 30%, rgba(153, 94, 220, 0.12), transparent 20rem),
        var(--color-bg);
    }

    :host-context(.dark) .cart-decor-paw,
    :host-context(.dark) .cart-decor-heart {
      opacity: 0.34;
      filter: drop-shadow(0 0 0.8rem rgba(183, 126, 255, 0.16));
    }
    :host-context(.dark) .cart-dots {
      opacity: 0.44;
    }

    @media (max-width: 767px) {
      .cart-decor-paw--top-right {
        top: 2.5rem;
        right: -1.2rem;
        width: 4.5rem;
      }
      .cart-decor-heart--top {
        top: 3.5rem;
        left: -0.45rem;
        width: 2.25rem;
      }
      .cart-dots--top {
        top: 1rem;
        right: -2rem;
        left: auto;
        width: 6.5rem;
      }
    }
    :host-context(.dark) .cart-summary {
      border-color: transparent;
      background:
        linear-gradient(145deg, rgba(43, 31, 60, 0.98), rgba(28, 22, 42, 0.98)) padding-box,
        linear-gradient(
            135deg,
            rgba(214, 170, 255, 0.78),
            rgba(121, 73, 184, 0.36) 52%,
            rgba(216, 173, 255, 0.64)
          )
          border-box;
      box-shadow:
        0 0 0.6rem rgba(193, 133, 255, 0.26),
        0 0 1.8rem rgba(157, 94, 220, 0.2),
        0 1.25rem 2.8rem rgba(0, 0, 0, 0.32),
        inset 0 1px rgba(229, 205, 255, 0.16);
    }
    :host-context(.dark) .cart-pending {
      background: linear-gradient(125deg, rgba(86, 60, 119, 0.9), rgba(48, 36, 69, 0.96));
    }

    @media (max-width: 1023px) {
      .cart-layout {
        max-width: 44rem;
        margin-inline: auto;
      }
    }

    @media (min-width: 1024px) {
      :host-context(.dark) .cart-summary {
        margin-top: -1.25rem;
      }
    }

    @media (max-width: 639px) {
      .cart-title {
        font-size: 2.2rem;
      }
      .cart-item {
        column-gap: 1rem;
      }
      .cart-summary {
        padding: 1.25rem;
      }
    }
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
    if (
      !this.cart.items().length ||
      this.pendingCheckout() ||
      this.state() === 'RESERVING' ||
      this.state() === 'CREATING_PREFERENCE'
    )
      return;
    this.message.set('');
    this.reservationText.set('');
    this.customerError.set('');
    const customer = this.validCustomer();
    if (!customer) return;
    this.attemptKey = crypto.randomUUID();
    this.state.set('RESERVING');
    this.api
      .reserve(
        {
          ...this.cart.reservePayload(),
          customer: { name: customer.name, email: customer.email, phone: customer.phone },
          fulfillment: { method: 'PICKUP', note: customer.note || null },
        },
        this.attemptKey,
      )
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
          this.message.set(
            'Algunos productos cambiaron de disponibilidad mientras comprabas. Revisá el carrito para continuar.',
          );
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
