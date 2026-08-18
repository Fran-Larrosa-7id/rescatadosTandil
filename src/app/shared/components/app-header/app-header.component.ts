import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SITE_CONFIG } from '../../../core/config/site.config';
import { ThemeService } from '../../../core/services/theme.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  template: `
    <header class="surface-glass border-b">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          routerLink="/"
          class="flex items-center gap-2 text-lg font-extrabold text-[var(--color-accent)]"
        >
          <app-icon name="paw" class="size-5" />
          <span>{{ brandName }}</span>
        </a>

        <nav class="hidden items-center gap-5 text-sm font-semibold md:flex" aria-label="Principal">
          <a
            routerLink="/"
            routerLinkActive="nav-active"
            [routerLinkActiveOptions]="{ exact: true }"
            class="inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-2 text-[var(--color-text)] transition hover:bg-[var(--color-recovering-bg)] hover:text-[var(--color-accent)]"
            ariaCurrentWhenActive="page"
          >
            <app-icon name="home" class="size-4" />
            <span>Inicio</span>
          </a>
          <a
            routerLink="/casos"
            routerLinkActive="nav-active"
            class="inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-2 text-[var(--color-text)] transition hover:bg-[var(--color-recovering-bg)] hover:text-[var(--color-accent)]"
            ariaCurrentWhenActive="page"
          >
            <app-icon name="paw" class="size-4" />
            <span>Casos</span>
          </a>
          <a
            routerLink="/donde-va-tu-ayuda"
            routerLinkActive="nav-active"
            class="inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-2 text-[var(--color-text)] transition hover:bg-[var(--color-recovering-bg)] hover:text-[var(--color-accent)]"
            ariaCurrentWhenActive="page"
          >
            <app-icon name="document" class="size-4" />
            <span>Dónde va tu ayuda</span>
          </a>
          <a
            routerLink="/merch"
            routerLinkActive="nav-active"
            class="inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-2 text-[var(--color-text)] transition hover:bg-[var(--color-recovering-bg)] hover:text-[var(--color-accent)]"
            ariaCurrentWhenActive="page"
          >
            <app-icon name="shop" class="size-4" />
            <span>Tienda Online</span>
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="soft-chip inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border text-[var(--color-text)] transition hover:border-[var(--color-accent)]"
            [attr.aria-label]="theme.isDark() ? 'Usar modo claro' : 'Usar modo oscuro'"
            [attr.aria-pressed]="theme.isDark()"
            [attr.title]="theme.isDark() ? 'Usar modo claro' : 'Usar modo oscuro'"
            (click)="theme.toggle()"
          >
            @if (theme.isDark()) {
              <app-icon name="sun" class="size-5" />
            } @else {
              <app-icon name="moon" class="size-5" />
            }
          </button>
          <a
            [routerLink]="['/donde-va-tu-ayuda']"
            fragment="ayudar"
            class="button-primary rounded-full px-4 py-2 text-sm font-extrabold shadow-sm transition sm:px-6"
          >
            Ayudar
          </a>
        </div>
      </div>
    </header>
  `,
})
export class AppHeaderComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly brandName = SITE_CONFIG.brandName;
}
