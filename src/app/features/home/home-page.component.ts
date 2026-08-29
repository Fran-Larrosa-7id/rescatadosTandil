import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DONATION_CONFIG } from '../../core/config/donation.config';
import { CASE_STATUS_META, RescueCase } from '../../core/models/rescue-case.model';
import { RescueCasesService } from '../../core/services/rescue-cases.service';
import { formatArs } from '../../core/utils/format-ars';
import { MERCH_PRODUCTS } from '../../data/merch/merch-products.data';
import { AppFooterComponent } from '../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../shared/components/bottom-navigation/bottom-navigation.component';
import { CopyAliasButtonComponent } from '../../shared/components/copy-alias-button/copy-alias-button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ShareButtonComponent } from '../../shared/components/share-button/share-button.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    NgOptimizedImage,
    AppHeaderComponent,
    AppFooterComponent,
    BottomNavigationComponent,
    CopyAliasButtonComponent,
    ShareButtonComponent,
    IconComponent,
    RevealOnScrollDirective,
  ],
  styles: `
    .home-hero {
      isolation: isolate;
      background:
        radial-gradient(
          circle at 92% 22%,
          color-mix(in srgb, var(--color-accent-soft) 62%, transparent),
          transparent 28rem
        ),
        radial-gradient(
          circle at 7% 84%,
          color-mix(in srgb, var(--color-surface-strong) 76%, transparent),
          transparent 25rem
        );
    }

    .home-hero-photo {
      border-radius: 29% 43% 33% 45% / 24% 37% 42% 49%;
      box-shadow: 0 24px 48px color-mix(in srgb, var(--color-text) 16%, transparent);
    }

    .home-hero-photo::before {
      position: absolute;
      inset: 0;
      z-index: 1;
      content: '';
      pointer-events: none;
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--color-card) 18%, transparent),
        transparent 45%
      );
    }

    .home-hero-orbit {
      border: 2px solid color-mix(in srgb, var(--color-accent) 22%, transparent);
      border-radius: 53% 47% 60% 40% / 40% 54% 46% 60%;
      transform: rotate(-22deg);
    }

    .home-inline-heart {
      position: relative;
      display: inline-block;
      width: 2.35rem;
      height: 2.35rem;
      overflow: hidden;
      vertical-align: -0.2em;
    }

    .home-inline-heart img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5rem;
      max-width: none;
      transform: translate(-50%, -48%);
    }

    .home-decor-paw,
    .home-decor-heart {
      position: absolute;
      z-index: 0;
      width: clamp(4rem, 8vw, 7rem);
      opacity: 0.28;
      pointer-events: none;
      user-select: none;
    }

    .home-decor-heart {
      width: clamp(9rem, 15vw, 14rem);
      opacity: 0.22;
    }

    .home-stories {
      isolation: isolate;
    }

    .home-stories::before {
      position: absolute;
      z-index: -2;
      top: -2.5rem;
      right: -8vw;
      left: -8vw;
      height: calc(100% + 5rem);
      content: '';
      background:
        radial-gradient(
          58% 90% at 10% 25%,
          color-mix(in srgb, var(--color-surface) 76%, transparent),
          transparent 75%
        ),
        var(--color-surface-elevated);
      border-radius: 48% 52% 0 0 / 7% 7% 0 0;
    }

    .home-shop {
      position: relative;
      isolation: isolate;
    }

    .home-shop::before {
      position: absolute;
      z-index: -2;
      inset: 0 -8vw;
      content: '';
      background:
        radial-gradient(
          42% 85% at 95% 46%,
          color-mix(in srgb, var(--color-accent-soft) 65%, transparent),
          transparent 75%
        ),
        var(--color-surface);
      border-radius: 48% 52% 0 0 / 6% 6% 0 0;
    }

    .home-feature-card {
      box-shadow: 0 14px 28px color-mix(in srgb, var(--color-text) 8%, transparent);
    }

    .home-case-image {
      aspect-ratio: 4 / 4.3;
    }

    .home-product-image {
      aspect-ratio: 1 / 1;
    }

    .home-hero-copy {
      text-align: left;
    }

    @media (max-width: 767px) {
      .home-hero-photo {
        border-radius: 2rem;
      }

      .home-stories::before,
      .home-shop::before {
        border-radius: 2rem 2rem 0 0;
      }
    }
  `,
  template: `
    <app-header />

    <main id="contenido" class="overflow-hidden">
      <section class="home-hero relative">
        <img
          src="images/extra/corazoncito-empty.png"
          alt=""
          aria-hidden="true"
          class="home-decor-heart bottom-12 left-[37%]"
        />
        <div
          class="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:px-6 md:grid-cols-2 md:items-center md:py-10 lg:px-8 lg:py-12"
        >
          <div appReveal="left" class="relative z-10 md:order-1">
            <p
              class="text-xs font-extrabold uppercase tracking-[0.09em] text-[var(--color-accent)]"
            >
              Cada vida merece una oportunidad
            </p>
            <h1
              class="mt-5 max-w-xl text-[2.5rem] font-black leading-[0.98] sm:text-6xl lg:text-[3.5rem]"
            >
              <span class="block">Ayudanos a</span>
              <span class="block sm:whitespace-nowrap">seguir salvando</span>
              <span class="block text-[var(--color-accent)]"
                >vidas
                <span class="home-inline-heart"
                  ><img src="images/extra/corazoncito-empty.png" alt="" /></span
              ></span>
            </h1>
            <p
              class="home-hero-copy mt-6 max-w-md text-base leading-7 text-[var(--color-text-muted)] sm:text-lg"
            >
              Rescatamos, cuidamos y acompañamos a gatitos en situaciones críticas. Con tu ayuda,
              podemos darles una segunda oportunidad.
            </p>
            <p
              class="mt-6 flex items-center gap-2 text-left text-xs font-semibold text-[var(--color-text-muted)]"
            >
              <span
                class="grid size-8 place-items-center rounded-full bg-[var(--color-surface-strong)] text-[var(--color-accent)]"
              >
                <app-icon name="paw" class="size-4" />
              </span>
              Cada aporte suma a una nueva oportunidad.
            </p>
          </div>

          <div
            appReveal="right"
            class="relative mx-auto hidden w-full max-w-lg md:order-2 md:block"
          >
            <div
              class="home-hero-orbit absolute -bottom-8 -left-8 size-40 bg-[var(--color-surface-strong)] opacity-70"
            ></div>
            <img
              src="images/extra/paw.png"
              alt=""
              aria-hidden="true"
              class="home-decor-paw -right-4 top-10"
            />
            <img
              src="images/extra/paw.png"
              alt=""
              aria-hidden="true"
              class="home-decor-paw -left-10 top-10 hidden -rotate-25 md:block"
            />
            <figure
              class="home-hero-photo relative z-10 m-0 aspect-[1.04] overflow-hidden bg-[var(--color-surface)]"
            >
              <img
                ngSrc="favicon.jpeg"
                alt="Logo de Gatarsis"
                class="h-full w-full object-contain"
                fill
                priority
                sizes="(min-width: 1024px) 43vw, (min-width: 768px) 46vw, 92vw"
              />
            </figure>
          </div>
        </div>
      </section>

      <section id="aporte" class="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div
          appReveal
          class="grid overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-elevated)] md:grid-cols-[1fr_1.05fr] md:p-9 lg:p-10"
        >
          <div
            class="flex flex-col justify-center border-b border-[var(--color-border)] pb-7 md:border-b-0 md:border-r md:pb-0 md:pr-10"
          >
            <p
              class="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-accent)]"
            >
              Deuda veterinaria activa
            </p>
            <p class="mt-3 text-5xl font-black leading-none text-[var(--color-accent)] sm:text-6xl">
              {{ formattedDebt }}
            </p>
            <p class="mt-5 max-w-sm text-left leading-7 text-[var(--color-text-muted)]">
              Cada número refleja una vida en recuperación. Tu ayuda hoy puede salvar la próxima.
            </p>
          </div>
          <div class="pt-7 md:pl-10 md:pt-0">
            <h2 class="text-xl font-black">Datos para ayudar</h2>
            <dl
              class="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4"
            >
              <div
                class="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-3 text-sm"
              >
                <dt class="text-[var(--color-text-muted)]">Titular</dt>
                <dd class="font-extrabold">{{ donationConfig.accountHolder }}</dd>
              </div>
              <div class="pt-3">
                <dt class="text-sm text-[var(--color-text-muted)]">Alias bancario</dt>
                <dd
                  class="mt-1 select-text break-all text-xl font-black text-[var(--color-accent)]"
                >
                  {{ donationConfig.alias }}
                </dd>
              </div>
            </dl>
            <div class="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                [href]="donationConfig.mercadoPagoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mercado-pago-button inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-center text-sm font-black shadow-sm transition sm:col-span-2"
              >
                <img
                  src="images/mp%20icon.svg"
                  alt=""
                  class="size-6 object-contain"
                  loading="lazy"
                />
                Donar con Mercado Pago
              </a>
              <app-copy-alias-button [text]="donationConfig.alias" variant="secondary" />
              <app-share-button
                title="Gatarsis"
                text="Sumate a ayudar a Gatarsis."
                [showLabel]="true"
                [fullWidth]="true"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="home-stories relative mx-auto mt-8 px-4 py-16 sm:px-6 lg:px-8">
        <img
          src="images/extra/paw.png"
          alt=""
          aria-hidden="true"
          class="home-decor-paw bottom-8 left-3 rotate-[-25deg]"
        />
        <img
          src="images/extra/paw.png"
          alt=""
          aria-hidden="true"
          class="home-decor-paw right-4 top-12 rotate-12"
        />
        <div
          appReveal
          class="relative z-10 mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end"
        >
          <div>
            <p
              class="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-accent)]"
            >
              Por ellos estamos acá
            </p>
            <h2 class="mt-3 max-w-sm text-4xl font-black leading-tight">
              Historias que nos mueven
            </h2>
            <p class="mt-4 max-w-sm text-left leading-7 text-[var(--color-text-muted)]">
              Cada rescate es una historia de lucha, esperanza y amor. Conocé a quienes hoy están en
              camino a una vida mejor.
            </p>
            <a
              routerLink="/casos"
              class="button-primary mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-sm font-extrabold"
            >
              Ver todos los casos <app-icon name="arrow" class="size-4" />
            </a>
          </div>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
            @for (item of homeCases; track item.slug) {
              <a
                [routerLink]="['/casos', item.slug]"
                class="home-feature-card group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] transition duration-200 hover:-translate-y-1 hover:border-[var(--color-accent)]"
              >
                <img
                  class="home-case-image w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  [ngSrc]="item.coverImage.src"
                  [alt]="item.coverImage.alt"
                  [width]="item.coverImage.width"
                  [height]="item.coverImage.height"
                  loading="lazy"
                  sizes="(min-width: 1024px) 17vw, (min-width: 640px) 22vw, 43vw"
                />
                <span class="block px-3 pb-1 pt-3 text-base font-black">{{ item.name }}</span>
                <span
                  class="mb-3 ml-3 inline-flex rounded-full bg-[var(--color-recovering-bg)] px-2.5 py-1 text-[11px] font-bold text-[var(--color-accent)]"
                >
                  {{ statusLabel(item) }}
                </span>
              </a>
            }
          </div>
        </div>
      </section>

      <section class="home-shop mt-8 overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <img
          src="images/extra/paw.png"
          alt=""
          aria-hidden="true"
          class="home-decor-paw bottom-4 right-4 -rotate-12"
        />
        <img
          src="images/extra/corazoncito-empty.png"
          alt=""
          aria-hidden="true"
          class="home-decor-heart right-16 top-8"
        />
        <div
          class="relative z-10 mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end"
        >
          <div appReveal="left">
            <p
              class="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-accent)]"
            >
              Tu compra también rescata
            </p>
            <h2 class="mt-3 text-4xl font-black leading-tight">Tienda Solidaria</h2>
            <p class="mt-4 max-w-sm text-left leading-7 text-[var(--color-text-muted)]">
              Cada producto de nuestra tienda ayuda a cubrir gastos veterinarios, alimentación y
              tránsito. Comprando, también salvás vidas.
            </p>
            <a
              routerLink="/tienda"
              class="button-primary mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-sm font-extrabold"
            >
              Ir a la tienda <app-icon name="arrow" class="size-4" />
            </a>
          </div>
          <div appReveal="right" class="grid grid-cols-2 gap-3 sm:grid-cols-3">
            @for (product of merchProducts; track product.slug) {
              <a
                [routerLink]="['/tienda', product.slug]"
                class="home-feature-card group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] transition duration-200 hover:-translate-y-1 hover:border-[var(--color-accent)]"
              >
                <img
                  class="home-product-image w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  [ngSrc]="product.coverImage.src"
                  [alt]="product.coverImage.alt"
                  [width]="product.coverImage.width"
                  [height]="product.coverImage.height"
                  loading="lazy"
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 28vw, 43vw"
                />
                <span class="block px-3 pb-1 pt-3 text-sm font-black">{{ product.name }}</span>
                <span class="mb-3 block px-3 text-sm font-extrabold text-[var(--color-accent)]">{{
                  productPrice(product.price)
                }}</span>
              </a>
            }
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div
          class="grid gap-6 border-y border-[var(--color-border)] py-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          <article class="flex gap-3">
            <app-icon name="shield" class="mt-0.5 size-7 text-[var(--color-accent)]" />
            <div>
              <h2 class="font-black">Transparencia</h2>
              <p class="mt-1 text-left text-sm leading-6 text-[var(--color-text-muted)]">
                Mostramos cada gasto y cada historia con total transparencia.
              </p>
            </div>
          </article>
          <article class="flex gap-3">
            <app-icon name="heart" class="mt-0.5 size-7 text-[var(--color-accent)]" />
            <div>
              <h2 class="font-black">Compromiso</h2>
              <p class="mt-1 text-left text-sm leading-6 text-[var(--color-text-muted)]">
                Acompañamos cada caso hasta su recuperación o adopción.
              </p>
            </div>
          </article>
          <article class="flex gap-3">
            <app-icon name="briefcase" class="mt-0.5 size-7 text-[var(--color-accent)]" />
            <div>
              <h2 class="font-black">Comunidad</h2>
              <p class="mt-1 text-left text-sm leading-6 text-[var(--color-text-muted)]">
                Nada de esto sería posible sin personas que eligen ayudar.
              </p>
            </div>
          </article>
          <article class="flex gap-3">
            <app-icon name="paw" class="mt-0.5 size-7 text-[var(--color-accent)]" />
            <div>
              <h2 class="font-black">Amor real</h2>
              <p class="mt-1 text-left text-sm leading-6 text-[var(--color-text-muted)]">
                Detrás de cada rescate hay dedicación, tiempo y mucho amor.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>

    <app-footer />
    <app-bottom-navigation />
  `,
})
export class HomePageComponent {
  private readonly casesService = inject(RescueCasesService);

  protected readonly donationConfig = DONATION_CONFIG;
  protected readonly formattedDebt = formatArs(DONATION_CONFIG.currentDebt);
  protected readonly homeCases = this.casesService.cases.slice(0, 4);
  protected readonly merchProducts = MERCH_PRODUCTS;

  protected statusLabel(item: RescueCase): string {
    return CASE_STATUS_META[item.statuses[0]].label;
  }

  protected productPrice(price: number | null): string {
    return price === null ? 'Consultar precio' : formatArs(price);
  }
}
