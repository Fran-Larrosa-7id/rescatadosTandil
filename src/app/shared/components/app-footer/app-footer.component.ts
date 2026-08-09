import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_CONFIG } from '../../../core/config/site.config';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, IconComponent],
  template: `
    <footer class="border-t border-[var(--color-border)] bg-white pb-24 pt-10 md:pb-10">
      <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <a routerLink="/" class="inline-flex items-center gap-2 text-xl font-extrabold text-[var(--color-accent)]">
          <app-icon name="spark" class="size-5" />
          <span>{{ brandName }}</span>
        </a>

        <nav class="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[var(--color-text-muted)]" aria-label="Pie">
          <a routerLink="/transparencia" fragment="ayudar" class="hover:text-[var(--color-accent)]">Contactanos</a>
          <a routerLink="/transparencia" fragment="ayudar" class="hover:text-[var(--color-accent)]">Alias bancario</a>
          <a routerLink="/transparencia" class="hover:text-[var(--color-accent)]">Preguntas frecuentes</a>
        </nav>

        <p class="mt-8 text-xs text-[var(--color-text-muted)]">
          © 2026 {{ brandName }}. Hecho con amor por los callejeritos.
        </p>
      </div>
    </footer>
  `
})
export class AppFooterComponent {
  protected readonly brandName = SITE_CONFIG.brandName;
}
