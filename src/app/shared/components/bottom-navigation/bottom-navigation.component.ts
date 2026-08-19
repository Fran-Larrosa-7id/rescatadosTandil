import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CartStore } from '../../../shop/core/cart.store';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-bottom-navigation',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  template: `
    <nav
      class="surface-glass fixed inset-x-0 bottom-0 z-40 border-t px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 md:hidden"
      aria-label="Navegación móvil"
    >
      <div class="mx-auto grid max-w-md grid-cols-4 gap-1.5">
        <a
          routerLink="/"
          routerLinkActive="nav-active"
          [routerLinkActiveOptions]="{ exact: true }"
          ariaCurrentWhenActive="page"
          class="flex min-h-12 flex-col items-center justify-center rounded-full px-3 text-xs font-bold text-[var(--color-text)]"
        >
          <app-icon name="home" class="size-4" />
          Inicio
        </a>
        <a
          routerLink="/casos"
          routerLinkActive="nav-active"
          ariaCurrentWhenActive="page"
          class="flex min-h-12 flex-col items-center justify-center rounded-full px-3 text-xs font-bold text-[var(--color-text)]"
        >
          <app-icon name="paw" class="size-4" />
          Casos
        </a>
        <a
          routerLink="/donde-va-tu-ayuda"
          routerLinkActive="nav-active"
          ariaCurrentWhenActive="page"
          class="flex min-h-12 flex-col items-center justify-center rounded-full px-3 text-xs font-bold text-[var(--color-text)]"
        >
          <app-icon name="receipt" class="size-4" />
          Ayuda
        </a>
        <a
          routerLink="/tienda"
          routerLinkActive="nav-active"
          ariaCurrentWhenActive="page"
          class="flex min-h-12 flex-col items-center justify-center rounded-full px-2 text-xs font-bold text-[var(--color-text)]"
        >
          <app-icon name="shop" class="size-4" />
          Tienda@if (cart.totalItems()) { ({{ cart.totalItems() }}) }
        </a>
      </div>
    </nav>
  `
})
export class BottomNavigationComponent {
  protected readonly cart = inject(CartStore);
}
