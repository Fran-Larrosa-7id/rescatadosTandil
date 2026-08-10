import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-bottom-navigation',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  template: `
    <nav
      class="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-white/95 px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-[0_-8px_24px_rgba(32,32,32,0.06)] backdrop-blur md:hidden"
      aria-label="Navegación móvil"
    >
      <div class="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a
          routerLink="/"
          routerLinkActive="bg-[var(--color-accent)] text-white"
          [routerLinkActiveOptions]="{ exact: true }"
          ariaCurrentWhenActive="page"
          class="flex min-h-12 flex-col items-center justify-center rounded-full px-3 text-xs font-bold text-[var(--color-text)]"
        >
          <app-icon name="home" class="size-4" />
          Inicio
        </a>
        <a
          routerLink="/casos"
          routerLinkActive="bg-[var(--color-accent)] text-white"
          ariaCurrentWhenActive="page"
          class="flex min-h-12 flex-col items-center justify-center rounded-full px-3 text-xs font-bold text-[var(--color-text)]"
        >
          <app-icon name="paw" class="size-4" />
          Casos
        </a>
        <a
          routerLink="/donde-va-tu-ayuda"
          routerLinkActive="bg-[var(--color-accent)] text-white"
          ariaCurrentWhenActive="page"
          class="flex min-h-12 flex-col items-center justify-center rounded-full px-3 text-xs font-bold text-[var(--color-text)]"
        >
          <app-icon name="receipt" class="size-4" />
          Ayuda
        </a>
      </div>
    </nav>
  `
})
export class BottomNavigationComponent {}
