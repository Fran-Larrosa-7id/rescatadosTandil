import { Component, input } from '@angular/core';

import { DONATION_CONFIG } from '../../../core/config/donation.config';
import { CopyAliasButtonComponent } from '../copy-alias-button/copy-alias-button.component';
import { ShareButtonComponent } from '../share-button/share-button.component';

@Component({
  selector: 'app-donation-card',
  imports: [CopyAliasButtonComponent, ShareButtonComponent],
  template: `
    <section
      id="ayudar"
      class="surface-elevated rounded-2xl border p-6"
      [class.md:p-8]="large()"
    >
      <h2 class="text-2xl font-extrabold">{{ title() }}</h2>
      <p class="mt-3 text-[var(--color-text-muted)]">
        Transferencia directa a la cuenta de la rescatista para ayudar con los gastos veterinarios.
      </p>

      <dl class="surface-warm mt-6 divide-y divide-[var(--color-border)] rounded-xl border px-4">
        <div class="flex items-center justify-between gap-4 py-4">
          <dt class="text-sm text-[var(--color-text-muted)]">Titular</dt>
          <dd class="text-right text-sm font-bold">{{ config.accountHolder }}</dd>
        </div>
        <div class="py-4">
          <dt class="text-sm text-[var(--color-text-muted)]">Alias bancario</dt>
          <dd class="mt-1 flex flex-wrap items-center justify-between gap-3">
            <span class="select-text break-all text-xl font-black text-[var(--color-accent)]">
              {{ config.alias }}
            </span>
          </dd>
        </div>
      </dl>

      <div class="mt-5 space-y-3">
        <a
          [href]="config.mercadoPagoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mercado-pago-button inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full px-5 py-3 text-sm font-black shadow-sm transition"
        >
          <img src="images/mp%20icon.svg" alt="" class="h-7 w-7 object-contain" loading="lazy" />
          Donar con Mercado Pago
        </a>
        <app-copy-alias-button [text]="config.alias" [variant]="buttonVariant()" />
      </div>

      @if (shareTitle() && shareText()) {
        <div class="mt-3">
          <app-share-button
            [title]="shareTitle()"
            [text]="shareText()"
            [showLabel]="true"
            [fullWidth]="true"
          />
        </div>
      }
    </section>
  `
})
export class DonationCardComponent {
  readonly title = input('Tu aporte directo');
  readonly large = input(false);
  readonly buttonVariant = input<'primary' | 'secondary'>('secondary');
  readonly shareTitle = input('');
  readonly shareText = input('');

  protected readonly config = DONATION_CONFIG;
}
