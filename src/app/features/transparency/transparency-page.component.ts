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

    <main id="contenido" class="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
      <section class="grid gap-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm md:p-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
        <div>
          <p class="inline-flex items-center gap-2 rounded-full bg-[var(--color-danger-bg)] px-3 py-1.5 text-xs font-extrabold uppercase text-[var(--color-accent)]">
            <app-icon name="receipt" class="size-4" />
            Deuda veterinaria activa
          </p>
          <h1 class="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Transparencia para ayudar mejor
          </h1>
          <p class="mt-5 max-w-2xl text-lg text-[var(--color-text-muted)] md:text-xl">
            Cada numero refleja una vida en recuperacion. Nuestra prioridad es saldar las cuentas
            de quienes ya estan sanando para poder ayudar a los que siguen esperando.
          </p>
        </div>

        <div class="rounded-2xl bg-[var(--color-surface)] p-6 shadow-inner">
          <p class="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            Total a pagar
          </p>
          <p class="mt-3 break-words text-[clamp(2.4rem,8vw,4.25rem)] font-black leading-none text-[var(--color-accent)]">
            {{ formattedDebt }}
          </p>
          <p class="mt-4 text-sm font-medium text-[var(--color-text-muted)]">
            Actualizado el {{ config.debtUpdatedAt }}
          </p>
        </div>
      </section>

      <section id="ayudar" class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <article class="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm md:p-8">
          <div class="flex items-start gap-4">
            <span class="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-recovering-bg)] text-[var(--color-accent)]">
              <app-icon name="wallet" class="size-6" />
            </span>
            <div>
              <h2 class="text-2xl font-extrabold">Datos para ayudar</h2>
              <p class="mt-2 text-[var(--color-text-muted)]">
                Transferencia directa a la cuenta de la rescatista para cubrir atencion,
                medicacion e internaciones.
              </p>
            </div>
          </div>

          <dl class="mt-7 grid gap-4 rounded-2xl bg-[var(--color-surface)] p-4 md:grid-cols-[1fr_auto] md:items-end">
            <div class="space-y-4">
              <div class="flex flex-wrap justify-between gap-3 border-b border-[var(--color-border)] pb-4">
                <dt class="text-[var(--color-text-muted)]">Titular</dt>
                <dd class="font-bold">{{ config.accountHolder }}</dd>
              </div>
              <div>
                <dt class="text-[var(--color-text-muted)]">Alias bancario</dt>
                <dd class="mt-1 select-text break-all text-3xl font-black leading-tight text-[var(--color-accent)]">
                  {{ config.alias }}
                </dd>
              </div>
            </div>

            <div class="md:min-w-56">
              <a
                [href]="config.mercadoPagoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mercado-pago-button inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full px-5 py-3 text-sm font-black shadow-sm transition"
              >
                <img src="images/mp%20icon.svg" alt="" class="h-7 w-7 object-contain" loading="lazy" />
                Donar con Mercado Pago
              </a>
              <div class="mt-3">
                <app-copy-alias-button [text]="config.alias" [variant]="'secondary'" />
              </div>
            </div>
          </dl>
        </article>

        <article class="rounded-3xl bg-[var(--color-surface)] p-6 shadow-sm md:p-8">
          <div class="flex items-start gap-4">
            <span class="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-card)] text-[var(--color-accent)]">
              <app-icon name="shop" class="size-6" />
            </span>
            <div>
              <h2 class="text-2xl font-extrabold">{{ config.veterinary.name }}</h2>
              <p class="mt-1 font-bold text-[var(--color-text-muted)]">{{ config.veterinary.address }}</p>
            </div>
          </div>
          <p class="mt-5 text-[var(--color-text-muted)]">
            Tambien podes colaborar directamente en la clinica. Acercate a recepcion y avisá que
            el aporte es para los rescates de Gatarsis.
          </p>
          <div class="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
            <iframe
              class="absolute inset-0 h-full w-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6345.545974524255!2d-59.1445204!3d-37.324204699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95911f4128af5d19%3A0xe61909a2682661b9!2sCl%C3%ADnica%20Veterinaria%20San%20Lorenzo!5e0!3m2!1ses!2sar!4v1786305112384!5m2!1ses!2sar"
              title="Ubicacion de Clinica Veterinaria San Lorenzo"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </article>
      </section>

      <section class="mt-14">
        <h2 class="text-3xl font-black">Que genera esta deuda?</h2>
        <div class="mt-6 grid gap-4 md:grid-cols-3">
          @for (item of expenseCategories; track item.title) {
            <article class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
              <h3 class="font-extrabold">{{ item.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{{ item.description }}</p>
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
      title: 'Internaciones y urgencias',
      description: 'Cuidados necesarios para estabilizar animales rescatados y sostener su recuperacion.'
    },
    {
      title: 'Estudios y cirugias',
      description: 'Practicas indicadas por profesionales para diagnosticos, operaciones y controles.'
    },
    {
      title: 'Medicacion e insumos',
      description: 'Elementos de uso frecuente durante tratamientos, higiene y recuperaciones prolongadas.'
    }
  ] as const;
}
