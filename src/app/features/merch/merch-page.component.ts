import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import {
  canReserveMerch,
  getPreorderStatusMeta,
  MERCH_PREORDER_CONFIG,
} from '../../core/config/merch-preorder.config';
import { SITE_CONFIG } from '../../core/config/site.config';
import { MERCH_PRODUCTS } from '../../data/merch/merch-products.data';
import { AppFooterComponent } from '../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../shared/components/bottom-navigation/bottom-navigation.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { MerchProductCardComponent } from '../../shared/components/merch-product-card/merch-product-card.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-merch-page',
  imports: [
    NgOptimizedImage,
    AppHeaderComponent,
    AppFooterComponent,
    BottomNavigationComponent,
    IconComponent,
    MerchProductCardComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <app-header />

    <main id="contenido">
      <section
        class="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-16 lg:px-8"
      >
        <div appReveal="left">
          <p
            class="soft-chip inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[var(--color-accent)]"
          >
            <app-icon name="shop" class="size-4" />
            Tienda online
          </p>
          <p class="mt-6 max-w-xl text-lg text-[var(--color-text-muted)] md:text-xl">
            Productos creados para ayudar a sostener los rescates.
          </p>
          <a
            href="#coleccion-gatarsis"
            (click)="scrollToCollection($event)"
            class="button-primary mt-8 inline-flex min-h-12 items-center justify-center rounded-full px-7 font-extrabold shadow-sm"
          >
            Ver productos
            <app-icon name="arrow" class="ml-2 size-4" />
          </a>
        </div>

        <div appReveal="right" [appRevealDelay]="90" class="merch-hero-carousel overflow-hidden">
          <div class="merch-hero-track">
            @for (product of heroProducts; track $index) {
              <div
                class="merch-hero-slide relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
                [attr.aria-hidden]="$index >= products.length"
              >
                <img
                  class="aspect-[3/4] h-full w-full object-cover"
                  [ngSrc]="product.coverImage.src"
                  [alt]="product.coverImage.alt"
                  [width]="product.coverImage.width"
                  [height]="product.coverImage.height"
                  [priority]="$index < products.length"
                  [attr.loading]="$index < products.length ? null : 'lazy'"
                  sizes="(min-width: 768px) 24vw, 64vw"
                />
              </div>
            }
          </div>
        </div>
      </section>

      <section appReveal class="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div
          class="preorder-glass grid gap-6 rounded-3xl border p-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:p-8"
        >
          <span
            class="inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--color-card)] text-[var(--color-accent)] shadow-sm"
          >
            <app-icon name="calendar" class="size-6" />
          </span>
          <div>
            <p class="text-xs font-extrabold uppercase tracking-wide text-[var(--color-accent)]">
              {{ preorderMeta.label }}
            </p>
            <h2 class="mt-2 text-2xl font-black">{{ preorderMeta.title }}</h2>
            <p class="mt-2 max-w-2xl text-[var(--color-text-muted)]">
              {{ preorderMeta.description }}
            </p>
            @if (preorder.nextOpeningAt) {
              <p class="mt-3 font-bold">Próxima preventa: {{ preorder.nextOpeningAt }}</p>
            }
            @if (preorder.closesAt && preorder.status === 'open') {
              <p class="mt-3 font-bold">Reservas hasta el {{ preorder.closesAt }}</p>
            }
          </div>
          @if (canReserve) {
            <a
              [href]="preorder.contactUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="button-primary inline-flex min-h-12 items-center justify-center rounded-full px-6 font-extrabold"
            >
              {{ preorderMeta.ctaLabel }}
            </a>
          }
        </div>
      </section>

      <section id="productos" class="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8">
        <div id="coleccion-gatarsis" appReveal class="max-w-2xl scroll-mt-24">
          <p class="text-sm font-extrabold uppercase tracking-wide text-[var(--color-accent)]">
            Colección Gatarsis
          </p>
          <h2 class="mt-2 text-4xl font-black">Productos con propósito.</h2>
          <p class="mt-3 text-[var(--color-text-muted)]">Elegí el que más te guste.</p>
        </div>

        <div class="mt-10 space-y-16 md:space-y-24">
          @for (product of products; track product.slug; let index = $index) {
            <app-merch-product-card
              appReveal
              [appRevealDelay]="index * 80"
              [product]="product"
              [preorder]="preorder"
              [alternate]="index % 2 === 1"
            />
          }
        </div>
      </section>

      <section appReveal class="border-y border-[var(--color-border)] bg-[var(--color-card)]">
        <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-black">¿Cómo funciona la preventa?</h2>
          <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            @for (step of steps; track step.title) {
              <article class="border-l-2 border-[var(--color-accent)] pl-4">
                <p class="text-sm font-extrabold text-[var(--color-accent)]">{{ step.number }}</p>
                <h3 class="mt-2 text-lg font-black">{{ step.title }}</h3>
                <p class="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  {{ step.description }}
                </p>
              </article>
            }
          </div>
        </div>
      </section>

      <section appReveal class="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h2 class="text-4xl font-black">Cada pequeño gesto, una gran diferencia.</h2>
        <p class="mt-4 text-lg text-[var(--color-text-muted)]">
          Con tu compra no solo te llevás algo de Gatarsis: también nos ayudás a seguir acompañando
          rescates.
        </p>
        @if (canReserve) {
          <a
            [href]="preorder.contactUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="button-primary mt-8 inline-flex min-h-12 items-center justify-center rounded-full px-7 font-extrabold shadow-sm"
          >
            {{ preorderMeta.ctaLabel }}
          </a>
        }
      </section>
    </main>

    <app-footer />
    <app-bottom-navigation />
  `,
})
export class MerchPageComponent {
  protected readonly preorder = MERCH_PREORDER_CONFIG;
  protected readonly preorderMeta = getPreorderStatusMeta(this.preorder.status);
  protected readonly canReserve = canReserveMerch(this.preorder);
  protected readonly products = MERCH_PRODUCTS;
  protected readonly heroProducts = [...MERCH_PRODUCTS, ...MERCH_PRODUCTS];
  protected readonly steps = [
    { number: '01', title: 'Elegís', description: 'Mirá los productos y variantes disponibles.' },
    { number: '02', title: 'Reservás', description: 'Nos escribís durante la preventa.' },
    {
      number: '03',
      title: 'Coordinamos',
      description: 'Confirmamos tu pedido y la forma de entrega.',
    },
    {
      number: '04',
      title: 'Tu compra ayuda',
      description: 'Cada compra suma para seguir sosteniendo los rescates.',
    },
  ] as const;

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  constructor() {
    const pageTitle = `Merch solidario | ${SITE_CONFIG.brandName}`;
    const description =
      'Conocé el merchandising de Gatarsis y ayudanos a seguir sosteniendo rescates.';
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
  }

  protected scrollToCollection(event: MouseEvent): void {
    event.preventDefault();
    this.document.getElementById('coleccion-gatarsis')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
