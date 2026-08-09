import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AppFooterComponent } from '../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../shared/components/bottom-navigation/bottom-navigation.component';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, AppHeaderComponent, AppFooterComponent, BottomNavigationComponent],
  template: `
    <app-header />
    <main id="contenido" class="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <h1 class="text-4xl font-black">No encontramos esta página.</h1>
      <p class="mt-4 text-[var(--color-text-muted)]">
        El enlace puede haber cambiado o el contenido todavía no está cargado.
      </p>
      <a
        routerLink="/"
        class="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-8 font-extrabold text-white"
      >
        Volver al inicio
      </a>
    </main>
    <app-footer />
    <app-bottom-navigation />
  `
})
export class NotFoundPageComponent {}
