import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DONATION_CONFIG } from '../../core/config/donation.config';
import { RescueCase } from '../../core/models/rescue-case.model';
import { RescueCasesService } from '../../core/services/rescue-cases.service';
import { formatArs } from '../../core/utils/format-ars';
import { MERCH_PRODUCTS } from '../../data/merch/merch-products.data';
import { AppFooterComponent } from '../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../shared/components/bottom-navigation/bottom-navigation.component';
import { CopyAliasButtonComponent } from '../../shared/components/copy-alias-button/copy-alias-button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
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
    IconComponent,
    RevealOnScrollDirective,
  ],
  styles: `
    .home-page {
      overflow: hidden;
      background:
        radial-gradient(circle at 94% 13%, color-mix(in srgb, var(--color-accent-soft) 45%, transparent), transparent 30rem),
        radial-gradient(circle at 4% 39%, color-mix(in srgb, var(--color-surface-strong) 55%, transparent), transparent 26rem),
        var(--color-bg);
    }

    .home-hero {
      isolation: isolate;
    }

    .home-hero::before {
      position: absolute;
      z-index: -1;
      top: 7rem;
      right: -12rem;
      width: min(48vw, 42rem);
      height: min(48vw, 42rem);
      content: '';
      border-radius: 58% 42% 50% 50% / 52% 56% 44% 48%;
      background: color-mix(in srgb, var(--color-surface-strong) 72%, transparent);
      transform: rotate(18deg);
    }

    .home-title-heart {
      position: relative;
      display: inline-block;
      width: 2.35rem;
      height: 2.35rem;
      overflow: hidden;
      vertical-align: -0.18em;
    }

    .home-title-heart img,
    .home-floating-heart img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5rem;
      max-width: none;
      transform: translate(-50%, -48%);
    }

    .home-hero-photo {
      border: 0.45rem solid color-mix(in srgb, var(--color-card) 92%, white);
      border-radius: 28% 42% 31% 46% / 24% 37% 43% 49%;
      box-shadow:
        0 0 0 0.3rem color-mix(in srgb, var(--color-accent) 20%, transparent),
        0 24px 48px color-mix(in srgb, var(--color-text) 15%, transparent);
    }

    .home-hero-photo::after {
      position: absolute;
      inset: 0;
      content: '';
      pointer-events: none;
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.16), transparent 42%);
    }

    .home-floating-heart {
      position: absolute;
      z-index: 2;
      right: -0.5rem;
      top: 16%;
      display: block;
      width: 3.3rem;
      height: 3.3rem;
      overflow: hidden;
      border: 0.35rem solid var(--color-card);
      border-radius: 999px;
      background: var(--color-card);
      box-shadow: var(--shadow-elevated);
    }

    .home-decor-paw {
      position: absolute;
      z-index: -1;
      width: clamp(3.5rem, 7vw, 6rem);
      opacity: 0.3;
      pointer-events: none;
      user-select: none;
    }

    .home-donation-shell {
      background: linear-gradient(135deg, var(--color-card), var(--color-surface));
      box-shadow: var(--shadow-elevated);
    }

    .home-donation-card {
      box-shadow: 0 12px 28px color-mix(in srgb, var(--color-text) 9%, transparent);
    }

    .home-carousel-panel {
      box-shadow: var(--shadow-surface);
    }

    .home-carousel-window {
      mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
    }

    .home-carousel-track {
      display: flex;
      width: max-content;
      gap: 0.85rem;
      animation: home-infinite-carousel 32s linear infinite;
      will-change: transform;
    }

    .home-carousel-window:hover .home-carousel-track,
    .home-carousel-window:focus-within .home-carousel-track {
      animation-play-state: paused;
    }

    .home-case-slide {
      width: clamp(10rem, 17vw, 12.5rem);
      flex: 0 0 auto;
    }

    .home-product-slide {
      width: clamp(10.5rem, 18vw, 13rem);
      flex: 0 0 auto;
    }

    @keyframes home-infinite-carousel {
      to {
        transform: translateX(calc(-50% - 0.425rem));
      }
    }

    @media (max-width: 767px) {
      .home-hero::before {
        display: none;
      }

      .home-carousel-window {
        margin-right: -1.5rem;
        mask-image: linear-gradient(to right, black 0%, black 86%, transparent 100%);
      }

      .home-carousel-track {
        animation-duration: 26s;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .home-carousel-window {
        overflow-x: auto;
        mask-image: none;
        scroll-snap-type: x mandatory;
      }

      .home-carousel-track {
        width: auto;
        animation: none;
      }

      .home-case-slide,
      .home-product-slide {
        scroll-snap-align: start;
      }
    }
  `,
  template: `
    <app-header />

    <main id="contenido" class="home-page">
      <section class="home-hero relative">
        <img src="images/extra/paw.png" alt="" aria-hidden="true" class="home-decor-paw left-[14%] top-7 hidden rotate-12 md:block" />
        <img src="images/extra/paw.png" alt="" aria-hidden="true" class="home-decor-paw right-[6%] top-[28rem] rotate-12" />
        <div class="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:px-8 md:grid-cols-2 md:items-start md:py-16 lg:px-8 lg:py-20">
          <div class="relative z-10">
            <p class="text-xs font-extrabold uppercase tracking-[0.09em] text-[var(--color-accent)]">
              Cada vida merece una oportunidad
            </p>
            <h1 class="mt-5 max-w-xl text-[2.5rem] font-black leading-[0.98] sm:text-6xl lg:text-[3.5rem]">
              <span class="block">Ayudanos a</span>
              <span class="block sm:whitespace-nowrap">seguir salvando</span>
              <span class="block text-[var(--color-accent)]">vidas <span class="home-title-heart"><img src="images/extra/corazoncito-empty.png" alt="" /></span></span>
            </h1>
            <p class="mt-6 max-w-md text-left text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">
              Detrás de cada rescate hay una historia de supervivencia. Conocé a los animales que hoy necesitan una mano para salir adelante.
            </p>
          </div>

          <div appReveal="right" class="relative mx-auto hidden w-full max-w-[29rem] md:block">
            <span class="home-floating-heart" aria-hidden="true"><img src="images/extra/corazoncito-empty.png" alt="" /></span>
            <figure class="home-hero-photo relative m-0 aspect-[1.04] overflow-hidden bg-[var(--color-surface)]">
              <img
                ngSrc="images/cases/maxine/cover.jpeg"
                alt="Maxine, una gata rescatada por Gatarsis"
                class="h-full w-full object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 43vw, (min-width: 768px) 46vw, 92vw"
              />
            </figure>
          </div>
        </div>
      </section>

      <section id="aporte" class="mx-auto max-w-6xl px-6 pb-8 sm:px-6 md:pb-12 lg:px-8">
        <div appReveal class="home-donation-shell grid rounded-[2rem] border border-[var(--color-border)] p-6 md:grid-cols-[1.05fr_0.95fr] md:p-8 lg:p-10">
          <div class="flex flex-col items-start gap-4 border-b border-[var(--color-border)] pb-7 md:flex-row md:items-center md:gap-5 md:border-b-0 md:border-r md:pb-0 md:pr-10">
            <span class="grid size-16 shrink-0 place-items-center rounded-full bg-[var(--color-surface-strong)] text-[var(--color-accent)]">
              <app-icon name="wallet" class="size-7" />
            </span>
            <div>
              <p class="text-sm font-extrabold uppercase tracking-[0.07em] text-[var(--color-accent)]">Deuda actual</p>
              <p class="mt-2 whitespace-nowrap text-[2.6rem] font-black leading-none text-[var(--color-accent)] sm:text-6xl">{{ formattedDebt }}</p>
              <p class="mt-5 max-w-sm text-left leading-6 text-[var(--color-text-muted)]">Esta deuda corresponde a gastos veterinarios acumulados de distintos rescates.</p>
            </div>
          </div>

          <section class="home-donation-card mt-7 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 md:-my-3 md:ml-8 md:mt-0">
            <h2 class="text-xl font-black">Tu aporte</h2>
            <p class="mt-2 text-left text-sm leading-6 text-[var(--color-text-muted)]">Transferencia directa a la cuenta de la rescatista para ayudar con los gastos veterinarios.</p>
            <dl class="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
              <div class="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-2 text-sm">
                <dt class="text-[var(--color-text-muted)]">Titular</dt>
                <dd class="font-extrabold">{{ donationConfig.accountHolder }}</dd>
              </div>
              <div class="pt-2">
                <dt class="text-sm text-[var(--color-text-muted)]">Alias bancario</dt>
                <dd class="mt-1 select-text break-all text-xl font-black text-[var(--color-accent)]">{{ donationConfig.alias }}</dd>
              </div>
            </dl>
            <a [href]="donationConfig.mercadoPagoUrl" target="_blank" rel="noopener noreferrer" class="mercado-pago-button mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-black shadow-sm transition">
              <img src="images/mp%20icon.svg" alt="" class="size-6 object-contain" loading="lazy" />
              Donar con Mercado Pago
            </a>
            <div class="mt-3"><app-copy-alias-button [text]="donationConfig.alias" variant="secondary" /></div>
          </section>
        </div>
      </section>

      <section appReveal class="mx-auto max-w-6xl px-6 py-3 sm:px-6 lg:px-8">
        <div class="home-carousel-panel grid gap-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 md:grid-cols-[0.75fr_1.25fr] md:items-center">
          <div>
            <h2 class="text-2xl font-black">Por ellos estamos acá <span class="text-[var(--color-accent)]">♡</span></h2>
            <p class="mt-3 max-w-sm text-left text-sm leading-6 text-[var(--color-text-muted)]">Conocé a los animales que actualmente están bajo nuestro cuidado y seguí de cerca su evolución.</p>
          </div>
          <div class="home-carousel-window overflow-hidden" aria-label="Historias destacadas">
            <div class="home-carousel-track">
              @for (item of caseCarousel; track $index) {
                <a [routerLink]="['/casos', item.slug]" class="home-case-slide group relative aspect-[1.06] overflow-hidden rounded-2xl bg-[var(--color-surface)]">
                  <img class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" [ngSrc]="item.coverImage.src" [alt]="item.coverImage.alt" [width]="item.coverImage.width" [height]="item.coverImage.height" loading="lazy" sizes="(min-width: 768px) 17vw, 52vw" />
                  <span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 text-base font-black text-white">{{ item.name }}</span>
                </a>
              }
            </div>
          </div>
        </div>
      </section>

      <section appReveal class="mx-auto max-w-6xl px-6 py-3 sm:px-6 lg:px-8">
        <div class="home-carousel-panel grid gap-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:grid-cols-[0.75fr_1.25fr] md:items-center">
          <div>
            <h2 class="text-2xl font-black">Tu compra también rescata <span class="text-[var(--color-accent)]">♡</span></h2>
            <p class="mt-3 max-w-sm text-left text-sm leading-6 text-[var(--color-text-muted)]">Productos creados para ayudar a sostener nuestros rescates.</p>
            <a routerLink="/tienda" class="button-primary mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-sm font-extrabold">Ver tienda <app-icon name="arrow" class="size-4" /></a>
          </div>
          <div class="home-carousel-window overflow-hidden" aria-label="Productos solidarios">
            <div class="home-carousel-track">
              @for (image of productCarousel; track $index) {
                <a routerLink="/tienda" class="home-product-slide overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]">
                  <img class="aspect-square h-full w-full object-cover" [ngSrc]="image.src" [alt]="image.alt" [width]="image.width" [height]="image.height" loading="lazy" sizes="(min-width: 768px) 18vw, 55vw" />
                </a>
              }
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-6xl px-6 py-12 sm:px-6 lg:px-8">
        <div class="grid gap-7 border-y border-[var(--color-border)] py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          <article class="flex gap-3 lg:pr-7"><app-icon name="shield" class="mt-0.5 size-7 shrink-0 text-[var(--color-accent)]" /><div><h2 class="font-black">Transparencia</h2><p class="mt-1 text-left text-sm leading-6 text-[var(--color-text-muted)]">Mostramos cada gasto y cada historia con total transparencia.</p></div></article>
          <article class="flex gap-3 lg:border-l lg:border-[var(--color-border)] lg:px-7"><app-icon name="heart" class="mt-0.5 size-7 shrink-0 text-[var(--color-accent)]" /><div><h2 class="font-black">Compromiso</h2><p class="mt-1 text-left text-sm leading-6 text-[var(--color-text-muted)]">Acompañamos cada caso hasta su recuperación o adopción.</p></div></article>
          <article class="flex gap-3 lg:border-l lg:border-[var(--color-border)] lg:px-7"><app-icon name="briefcase" class="mt-0.5 size-7 shrink-0 text-[var(--color-accent)]" /><div><h2 class="font-black">Infonunidad</h2><p class="mt-1 text-left text-sm leading-6 text-[var(--color-text-muted)]">Nada de esto sería posible sin personas que eligen ayudar.</p></div></article>
          <article class="flex gap-3 lg:border-l lg:border-[var(--color-border)] lg:pl-7"><app-icon name="paw" class="mt-0.5 size-7 shrink-0 text-[var(--color-accent)]" /><div><h2 class="font-black">Amor real</h2><p class="mt-1 text-left text-sm leading-6 text-[var(--color-text-muted)]">Detrás de cada rescate hay dedicación, tiempo y mucho amor.</p></div></article>
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
  private readonly highlightedCases = ['pochoclo', 'patan', 'gina']
    .map((slug) => this.casesService.getBySlug(slug))
    .filter((item): item is RescueCase => item !== undefined);
  protected readonly caseCarousel = [...this.highlightedCases, ...this.highlightedCases];
  private readonly productImages = MERCH_PRODUCTS.flatMap((product) => [product.coverImage, ...product.gallery]);
  protected readonly productCarousel = [...this.productImages, ...this.productImages];
}
