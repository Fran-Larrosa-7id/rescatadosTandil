import { Component } from '@angular/core';

import { DONATION_CONFIG } from '../../core/config/donation.config';
import { formatArs } from '../../core/utils/format-ars';
import { AppFooterComponent } from '../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../shared/components/bottom-navigation/bottom-navigation.component';
import { CopyAliasButtonComponent } from '../../shared/components/copy-alias-button/copy-alias-button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-transparency-page',
  imports: [
    AppHeaderComponent,
    AppFooterComponent,
    BottomNavigationComponent,
    CopyAliasButtonComponent,
    IconComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <app-header />

    <main id="contenido" class="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
      <section
        appReveal
        class="transparency-hero grid gap-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm md:p-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center"
      >
        <div>
          <p
            class="transparency-debt-badge inline-flex items-center gap-2 rounded-full bg-[var(--color-danger-bg)] px-3 py-1.5 text-xs font-extrabold uppercase text-[var(--color-accent)]"
          >
            <app-icon name="receipt" class="transparency-badge-icon size-4" />
            Deuda veterinaria activa
          </p>
          <h1 class="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Transparencia para ayudar mejor
          </h1>
          <p class="mt-5 max-w-2xl text-lg text-[var(--color-text-muted)] md:text-xl">
            Cada número refleja una vida en recuperación. Nuestra prioridad es saldar las cuentas de
            quienes ya están sanando para poder ayudar a los que siguen esperando.
          </p>
        </div>

        <div
          class="transparency-debt-panel rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-inner"
        >
          <p class="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            Total a pagar
          </p>
          <p
            class="transparency-debt-amount mt-3 max-w-full whitespace-nowrap text-[clamp(2rem,5.2vw,3.5rem)] font-black leading-none tracking-[-0.05em] tabular-nums"
          >
            {{ formattedDebt }}
          </p>
          <p class="mt-4 text-sm font-medium text-[var(--color-text-muted)]">
            Actualizado el {{ config.debtUpdatedAt }}
          </p>
        </div>
      </section>

      <section id="ayudar" appReveal class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <article
          class="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm md:p-8"
        >
          <div class="flex items-start gap-4">
            <span
              class="transparency-help-icon inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-recovering-bg)] text-[var(--color-accent)]"
            >
              <app-icon name="wallet" class="size-6" />
            </span>
            <div>
              <h2 class="text-2xl font-extrabold">Datos para ayudar</h2>
              <p class="mt-2 text-[var(--color-text-muted)]">
                Transferencia directa a la cuenta de la rescatista para ayudar con los gastos
                veterinarios.
              </p>
            </div>
          </div>

          <dl
            class="transparency-transfer mt-7 grid gap-4 rounded-2xl bg-[var(--color-surface)] p-4 md:grid-cols-[1fr_auto] md:items-end"
          >
            <div class="space-y-4">
              <div
                class="flex flex-wrap justify-between gap-3 border-b border-[var(--color-border)] pb-4"
              >
                <dt class="text-[var(--color-text-muted)]">Titular</dt>
                <dd class="font-bold">{{ config.accountHolder }}</dd>
              </div>
              <div>
                <dt class="text-[var(--color-text-muted)]">Alias bancario</dt>
                <dd
                  class="mt-1 select-text break-all text-3xl font-black leading-tight text-[var(--color-accent)]"
                >
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
                <img
                  src="images/mp%20icon.svg"
                  alt=""
                  class="h-7 w-7 object-contain"
                  loading="lazy"
                />
                Donar con Mercado Pago
              </a>
              <div class="mt-3">
                <app-copy-alias-button [text]="config.alias" [variant]="'secondary'" />
              </div>
            </div>
          </dl>
        </article>

        <article
          class="transparency-clinic rounded-3xl bg-[var(--color-surface)] p-6 shadow-sm md:p-8"
        >
          <div class="flex items-start gap-4">
            <span
              class="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-card)] text-[var(--color-accent)]"
            >
              <app-icon name="shop" class="size-6" />
            </span>
            <div>
              <h2 class="text-2xl font-extrabold">{{ config.veterinary.name }}</h2>
              <p class="mt-1 font-bold text-[var(--color-text-muted)]">
                {{ config.veterinary.address }}
              </p>
            </div>
          </div>
          <p class="mt-5 text-[var(--color-text-muted)]">
            También podés colaborar directamente en la clínica veterinaria. Acercate a recepción y
            avisá que el aporte es para los rescates de Aldana Salazar.
          </p>
          <div
            class="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white"
          >
            <iframe
              class="absolute inset-0 h-full w-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6345.545974524255!2d-59.1445204!3d-37.324204699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95911f4128af5d19%3A0xe61909a2682661b9!2sCl%C3%ADnica%20Veterinaria%20San%20Lorenzo!5e0!3m2!1ses!2sar!4v1786305112384!5m2!1ses!2sar"
              title="Ubicación de Clínica Veterinaria San Lorenzo"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </article>
      </section>
    </main>

    <app-footer />
    <app-bottom-navigation />
  `,
})
export class TransparencyPageComponent {
  protected readonly config = DONATION_CONFIG;
  protected readonly formattedDebt = formatArs(DONATION_CONFIG.currentDebt);
  protected readonly expenseCategories = [
    {
      title: 'Atención veterinaria',
      description: 'Consultas, estudios, internaciones y cirugías necesarias según cada caso.',
    },
    {
      title: 'Tratamientos y medicación',
      description: 'Medicamentos, curaciones e insumos necesarios para acompañar su recuperación.',
    },
    {
      title: 'Cuidados diarios',
      description:
        'Alimentación, higiene, traslados y todo lo necesario mientras están bajo nuestro cuidado.',
    },
  ] as const;
}
