import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SITE_CONFIG } from '../../../core/config/site.config';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  template: `
    <header class="border-b border-[var(--color-border)] bg-[var(--color-bg)]/95">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a routerLink="/" class="flex items-center gap-2 text-lg font-extrabold text-[var(--color-accent)]">
          <app-icon name="paw" class="size-5" />
          <span>{{ brandName }}</span>
        </a>

        <nav class="hidden items-center gap-5 text-sm font-semibold md:flex" aria-label="Principal">
          <a
            routerLink="/"
            routerLinkActive="border-[var(--color-accent)] bg-[var(--color-recovering-bg)] text-[var(--color-accent)]"
            [routerLinkActiveOptions]="{ exact: true }"
            class="inline-flex items-center gap-1.5 rounded-t-md border-b-2 border-transparent px-2 py-2 text-[var(--color-text)] transition hover:text-[var(--color-accent)]"
            ariaCurrentWhenActive="page"
          >
            <app-icon name="home" class="size-4" />
            <span>Inicio</span>
          </a>
          <a
            routerLink="/casos"
            routerLinkActive="border-[var(--color-accent)] bg-[var(--color-recovering-bg)] text-[var(--color-accent)]"
            class="inline-flex items-center gap-1.5 rounded-t-md border-b-2 border-transparent px-2 py-2 text-[var(--color-text)] transition hover:text-[var(--color-accent)]"
            ariaCurrentWhenActive="page"
          >
            <app-icon name="paw" class="size-4" />
            <span>Casos</span>
          </a>
          <a
            routerLink="/transparencia"
            routerLinkActive="border-[var(--color-accent)] bg-[var(--color-recovering-bg)] text-[var(--color-accent)]"
            class="inline-flex items-center gap-1.5 rounded-t-md border-b-2 border-transparent px-2 py-2 text-[var(--color-text)] transition hover:text-[var(--color-accent)]"
            ariaCurrentWhenActive="page"
          >
            <app-icon name="document" class="size-4" />
            <span>Transparencia</span>
          </a>
        </nav>

        <a
          [routerLink]="['/transparencia']"
          fragment="ayudar"
          class="rounded-full bg-[var(--color-accent)] px-6 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-[var(--color-accent-hover)]"
        >
          Ayudar
        </a>
      </div>
    </header>
  `
})
export class AppHeaderComponent {
  protected readonly brandName = SITE_CONFIG.brandName;
}
