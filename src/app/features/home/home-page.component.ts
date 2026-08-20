import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DONATION_CONFIG } from '../../core/config/donation.config';
import { RescueCasesService } from '../../core/services/rescue-cases.service';
import { MERCH_PRODUCTS } from '../../data/merch/merch-products.data';
import { AppFooterComponent } from '../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../shared/components/bottom-navigation/bottom-navigation.component';
import { CaseCardComponent } from '../../shared/components/case-card/case-card.component';
import { CurrentDebtCardComponent } from '../../shared/components/current-debt-card/current-debt-card.component';
import { DonationCardComponent } from '../../shared/components/donation-card/donation-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
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
    CurrentDebtCardComponent,
    DonationCardComponent,
    CaseCardComponent,
    EmptyStateComponent,
    IconComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <app-header />

    <main id="contenido">
      <section
        class="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-16 lg:px-8"
      >
        <div
          appReveal="left"
          [appRevealDelay]="300"
          class="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-surface)] shadow-sm"
        >
          <img
            ngSrc="images/cases/tiky/cover.avif"
            alt="Foto pendiente para la portada de Gatarsis"
            class="aspect-[4/3] h-full w-full object-cover"
            fill
            priority
          />
        </div>

        <div appReveal="right" [appRevealDelay]="300">
          <h1 class="max-w-xl text-5xl font-black leading-[1.02] md:text-6xl">
            Ayudanos a seguir salvando vidas.
          </h1>
          <p class="mt-6 max-w-xl text-lg text-[var(--color-text-muted)] md:text-xl">
            Detrás de cada rescate hay una historia de supervivencia. Conocé a los animales que hoy
            necesitan una mano para salir adelante.
          </p>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div
          appReveal
          [appRevealDelay]="300"
          class="grid gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:grid-cols-[1.25fr_0.75fr] md:items-center md:p-10"
        >
          <app-current-debt-card />
          <app-donation-card [large]="true" [buttonVariant]="'secondary'" />
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div appReveal [appRevealDelay]="300" class="mb-7 flex items-end justify-between gap-4">
          <div>
            <h2 class="text-4xl font-black">Por ellos estamos acá</h2>
            <p class="mt-2 text-[var(--color-text-muted)]">
              Conocé a los animales que actualmente están bajo nuestro cuidado y seguí de cerca su
              evolución.
            </p>
          </div>
          <a
            routerLink="/casos"
            class="hidden text-sm font-extrabold text-[var(--color-accent)] md:inline-flex"
          >
            Ver todos los casos
            <app-icon name="arrow" class="size-4" />
          </a>
        </div>

        @if (featuredCases.length > 0) {
          <div
            class="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
          >
            @for (item of featuredCases; track item.slug) {
              <div
                appReveal
                [appRevealDelay]="$index * 100"
                class="w-[82vw] shrink-0 snap-start md:w-auto"
              >
                <app-case-card [item]="item" />
              </div>
            }
          </div>
        } @else {
          <app-empty-state />
        }
      </section>
      <section appReveal class="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div
          class="grid gap-7 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:grid-cols-[0.9fr_1.1fr] md:items-center md:p-8"
        >
          <div>
            <h2 class="mt-5 text-4xl font-black">Tu compra también rescata.</h2>
            <p class="mt-3 max-w-xl text-[var(--color-text-muted)]">
              Productos creados para ayudar a sostener nuestros rescates
            </p>
            <a
              routerLink="/merch"
              class="button-primary mt-7 inline-flex min-h-12 items-center justify-center rounded-full px-7 font-extrabold shadow-sm"
            >
              Ver tienda
              <app-icon name="arrow" class="ml-2 size-4" />
            </a>
          </div>
          <div class="home-merch-carousel overflow-hidden">
            <div class="home-merch-track">
            @for (product of merchCarouselProducts; track $index) {
              <div
                class="home-merch-slide overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]"
              >
                <img
                  class="aspect-[3/4] h-full w-full object-cover"
                  [ngSrc]="product.coverImage.src"
                  [alt]="product.coverImage.alt"
                  [width]="product.coverImage.width"
                  [height]="product.coverImage.height"
                  loading="lazy"
                  sizes="(min-width: 768px) 26vw, 45vw"
                />
              </div>
            }
            </div>
          </div>
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
  protected readonly featuredCases = this.casesService.getFeatured();
  protected readonly merchProducts = MERCH_PRODUCTS.filter((product) => product.featured).slice(0, 4);
  protected readonly merchCarouselProducts = [...this.merchProducts, ...this.merchProducts];
}
