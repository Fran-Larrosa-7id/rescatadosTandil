import { Component } from '@angular/core';

import { DONATION_CONFIG } from '../../core/config/donation.config';
import { formatArs } from '../../core/utils/format-ars';
import { AppFooterComponent } from '../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../shared/components/bottom-navigation/bottom-navigation.component';
import { CopyAliasButtonComponent } from '../../shared/components/copy-alias-button/copy-alias-button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-transparency-page',
  imports: [
    AppHeaderComponent,
    AppFooterComponent,
    BottomNavigationComponent,
    CopyAliasButtonComponent,
    IconComponent
  ],
  template: `
    <app-header />

    <main id="contenido" class="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
      <section>
        <h1 class="text-4xl font-black leading-tight md:text-6xl">Deuda veterinaria actual</h1>
        <p class="mt-5 max-w-3xl text-lg text-[var(--color-text-muted)] md:text-xl">
          Cada número refleja una vida en recuperación. Nuestra prioridad es saldar las cuentas de
          quienes ya están sanando para poder ayudar a los que siguen esperando.
        </p>
        <div class="mt-10 rounded-2xl bg-white p-8 text-center shadow-sm">
          <p class="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            Total a pagar
          </p>
          <p class="mt-4 break-words text-[clamp(2.4rem,12vw,4.5rem)] font-black leading-none text-[var(--color-accent)]">
            {{ formattedDebt }}
          </p>
        </div>
      </section>

      <section id="ayudar" class="mt-12 grid gap-6 md:grid-cols-2">
        <div class="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
          <h2 class="text-2xl font-extrabold">Datos para ayudar</h2>
          <dl class="mt-6 rounded-xl bg-[var(--color-surface)] p-4">
            <div class="flex justify-between gap-4">
              <dt class="text-[var(--color-text-muted)]">Titular:</dt>
              <dd class="font-bold">{{ config.accountHolder }}</dd>
            </div>
            <div class="mt-5">
              <dt class="text-[var(--color-text-muted)]">Alias:</dt>
              <dd class="mt-2 rounded-xl bg-white p-4">
                <span class="select-text break-all text-2xl font-black text-[var(--color-accent)]">
                  {{ config.alias }}
                </span>
                <div class="mt-4">
                  <app-copy-alias-button [text]="config.alias" [variant]="'primary'" />
                </div>
              </dd>
            </div>
          </dl>
        </div>

        <div class="rounded-2xl bg-[var(--color-surface)] p-6">
          <h2 class="text-2xl font-extrabold">{{ config.veterinary.name }}</h2>
          <p class="mt-2 flex items-center gap-2 font-bold text-[var(--color-text-muted)]">
            <app-icon name="shop" class="size-5" />
            {{ config.veterinary.address }}
          </p>
          <p class="mt-5 text-[var(--color-text-muted)]">
            También podés colaborar directamente en Clínica San Lorenzo, San Lorenzo 947, Tandil.
          </p>
          <div class="relative mt-6 aspect-[4/3] overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
            <iframe
              class="absolute inset-0 h-full w-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6345.545974524255!2d-59.1445204!3d-37.324204699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95911f4128af5d19%3A0xe61909a2682661b9!2sCl%C3%ADnica%20Veterinaria%20San%20Lorenzo!5e0!3m2!1ses!2sar!4v1786305112384!5m2!1ses!2sar"
              title="Ubicación de Clínica Veterinaria San Lorenzo"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>

      <section class="mt-14">
        <h2 class="text-3xl font-black">¿Qué genera esta deuda?</h2>
        <div class="mt-6 grid gap-5">
          @for (item of expenseCategories; track item.title) {
            <article class="border-l-2 border-[var(--color-accent)] pl-5">
              <h3 class="font-extrabold">{{ item.title }}</h3>
              <p class="mt-1 text-[var(--color-text-muted)]">{{ item.description }}</p>
            </article>
          }
        </div>
      </section>
    </main>

    <app-footer />
    <app-bottom-navigation />
  `
})
export class TransparencyPageComponent {
  protected readonly config = DONATION_CONFIG;
  protected readonly formattedDebt = formatArs(DONATION_CONFIG.currentDebt);
  protected readonly expenseCategories = [
    {
      title: 'Internaciones y urgencias veterinarias',
      description: 'Gastos necesarios para estabilizar animales rescatados y sostener sus cuidados.'
    },
    {
      title: 'Estudios, cirugías y tratamientos',
      description: 'Prácticas indicadas por profesionales para diagnósticos y recuperación.'
    },
    {
      title: 'Medicaciones e insumos',
      description: 'Elementos de uso frecuente durante el tratamiento de distintos rescates.'
    }
  ] as const;
}
