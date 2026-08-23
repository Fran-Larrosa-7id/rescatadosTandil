import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_CONFIG } from '../../../core/config/site.config';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, IconComponent],
  template: `
    <footer
      class="app-footer mt-auto border-t border-[var(--color-border)] bg-[var(--color-card)] pb-24 pt-7 md:pb-7"
    >
      <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <a
          routerLink="/"
          class="inline-flex items-center gap-2 text-xl font-extrabold text-[var(--color-accent)]"
        >
          <app-icon name="paw" class="size-5" />
          <span>{{ brandName }}</span>
        </a>

        <p class="mt-5 text-xs text-[var(--color-text-muted)]">
          © 2026 {{ brandName }}. Hecho por
          <a
            href="https://github.com/FranciscoLarrosa96/"
            target="_blank"
            rel="noopener noreferrer"
            class="font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
          >
            Francisco Larrosa
          </a>
        </p>
      </div>
    </footer>
  `,
})
export class AppFooterComponent {
  protected readonly brandName = SITE_CONFIG.brandName;
}
