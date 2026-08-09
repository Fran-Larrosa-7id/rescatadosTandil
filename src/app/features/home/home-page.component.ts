import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DONATION_CONFIG } from '../../core/config/donation.config';
import { RescueCasesService } from '../../core/services/rescue-cases.service';
import { AppFooterComponent } from '../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../shared/components/bottom-navigation/bottom-navigation.component';
import { CaseCardComponent } from '../../shared/components/case-card/case-card.component';
import { CurrentDebtCardComponent } from '../../shared/components/current-debt-card/current-debt-card.component';
import { DonationCardComponent } from '../../shared/components/donation-card/donation-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

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
  ],
  template: `
    <app-header />

    <main id="contenido">
      <section
        class="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-16 lg:px-8"
      >
        <div
          class="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-surface)] shadow-sm"
        >
          <img
            ngSrc="images/cases/tiky/cover.avif"
            alt="Foto pendiente para la portada de Rescate Tandil"
            class="aspect-[4/3] h-full w-full object-cover"
            fill
            priority
          />
        </div>

        <div>
          <h1 class="max-w-xl text-5xl font-black leading-[1.02] md:text-6xl">
            Ayudanos a seguir salvando vidas.
          </h1>
          <p class="mt-6 max-w-xl text-lg text-[var(--color-text-muted)] md:text-xl">
            Detrás de cada rescate real hay una historia de supervivencia. Conocé a los animales que
            hoy necesitan una mano para salir adelante.
          </p>
          <div class="mt-8 grid gap-3 sm:flex">
            <a
              href="#ayudar"
              class="button-primary inline-flex min-h-12 items-center justify-center rounded-full px-8 font-extrabold shadow-sm"
            >
              Quiero ayudar
            </a>
            <a
              routerLink="/casos"
              class="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-text-muted)] px-8 font-extrabold text-[var(--color-text)] hover:border-[var(--color-accent)]"
            >
              Ver los casos
            </a>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div
          class="grid gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:grid-cols-[1.25fr_0.75fr] md:items-center md:p-10"
        >
          <app-current-debt-card />
          <app-donation-card [large]="true" [buttonVariant]="'secondary'" />
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div class="mb-7 flex items-end justify-between gap-4">
          <div>
            <h2 class="text-4xl font-black">Historias que necesitan una mano.</h2>
            <p class="mt-2 text-[var(--color-text-muted)]">
              Conocé a los animales que actualmente están bajo cuidado, recibiendo tratamiento o
              atravesando su recuperación.
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
              <div class="w-[82vw] shrink-0 snap-start md:w-auto">
                <app-case-card [item]="item" />
              </div>
            }
          </div>
        } @else {
          <app-empty-state />
        }
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
}
