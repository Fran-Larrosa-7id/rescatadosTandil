import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_CONFIG } from '../../../core/config/site.config';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, IconComponent],
  template: `
    <footer class="app-footer mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)] pb-24 pt-10 md:pb-8">
      <div class="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.9fr_1.25fr] lg:px-8">
        <div>
          <a routerLink="/" class="inline-flex items-center gap-2 text-xl font-extrabold text-[var(--color-accent)]">
            <app-icon name="paw" class="size-6" />
            <span>{{ brandName }}</span>
          </a>
          <p class="mt-4 max-w-55 text-left text-sm leading-6 text-[var(--color-text-muted)]">
            Rescatamos, cuidamos y damos una nueva oportunidad a gatitos en situaciones críticas.
          </p>
          <div class="mt-4 flex gap-3 text-[var(--color-text-muted)]">
            <a href="#" aria-label="Instagram" class="grid size-8 place-items-center rounded-full border border-[var(--color-border)] hover:text-[var(--color-accent)]"><app-icon name="share" class="size-4" /></a>
            <a href="#" aria-label="Facebook" class="grid size-8 place-items-center rounded-full border border-[var(--color-border)] hover:text-[var(--color-accent)]"><app-icon name="share" class="size-4" /></a>
            <a href="#" aria-label="WhatsApp" class="grid size-8 place-items-center rounded-full border border-[var(--color-border)] hover:text-[var(--color-accent)]"><app-icon name="share" class="size-4" /></a>
          </div>
        </div>

        <nav aria-label="Navegación del pie">
          <h2 class="text-sm font-black">Navegación</h2>
          <div class="mt-4 grid gap-2 text-sm text-[var(--color-text-muted)]">
            <a routerLink="/" class="hover:text-[var(--color-accent)]">Inicio</a>
            <a routerLink="/casos" class="hover:text-[var(--color-accent)]">Casos</a>
            <a routerLink="/donde-va-tu-ayuda" class="hover:text-[var(--color-accent)]">¿Dónde va tu ayuda?</a>
            <a routerLink="/tienda" class="hover:text-[var(--color-accent)]">Tienda Online</a>
          </div>
        </nav>

        <nav aria-label="Información del pie">
          <h2 class="text-sm font-black">Información</h2>
          <div class="mt-4 grid gap-2 text-sm text-[var(--color-text-muted)]">
            <a routerLink="/" class="hover:text-[var(--color-accent)]">Sobre Gatarsis</a>
            <a routerLink="/" fragment="aporte" class="hover:text-[var(--color-accent)]">Cómo ayudar</a>
            <a routerLink="/donde-va-tu-ayuda" class="hover:text-[var(--color-accent)]">Preguntas frecuentes</a>
            <a href="mailto:gatarsis.tandil@gmail.com" class="hover:text-[var(--color-accent)]">Contacto</a>
          </div>
        </nav>

        <form class="self-start" action="mailto:gatarsis.tandil@gmail.com" method="post" enctype="text/plain">
          <h2 class="text-sm font-black">Newsletter</h2>
          <p class="mt-4 text-left text-sm leading-6 text-[var(--color-text-muted)]">Enterate de rescates, necesidades y formas de ayudar.</p>
          <label class="sr-only" for="newsletter-email">Tu email</label>
          <div class="mt-4 flex rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-1">
            <input id="newsletter-email" name="email" type="email" required autocomplete="email" placeholder="Tu email" class="min-w-0 flex-1 rounded-lg bg-transparent px-3 text-sm outline-none" />
            <button type="submit" class="button-primary min-h-10 rounded-lg px-4 text-sm font-extrabold">Suscribirme</button>
          </div>
        </form>
      </div>
      <p class="mt-10 px-4 text-center text-xs text-[var(--color-text-muted)]">
        © 2026 {{ brandName }}. Hecho por
        <a href="https://github.com/FranciscoLarrosa96/" target="_blank" rel="noopener noreferrer" class="font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]">Francisco Larrosa</a>
      </p>
    </footer>
  `,
})
export class AppFooterComponent {
  protected readonly brandName = SITE_CONFIG.brandName;
}
