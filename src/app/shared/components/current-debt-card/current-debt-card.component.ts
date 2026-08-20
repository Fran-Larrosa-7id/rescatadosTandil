import { Component } from '@angular/core';

import { DONATION_CONFIG } from '../../../core/config/donation.config';
import { formatArs } from '../../../core/utils/format-ars';

@Component({
  selector: 'app-current-debt-card',
  template: `
    <section class="surface-card rounded-2xl border p-6 md:p-10">
      <p class="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-accent)]">
        Deuda actual
      </p>
      <p
        class="mt-4 break-words text-[clamp(2rem,10vw,3.75rem)] font-black leading-none text-[var(--color-text)]"
      >
        {{ formattedDebt }}
      </p>
      <p class="mt-4 max-w-2xl text-base text-[var(--color-text-muted)]">
        Esta deuda corresponde a gastos veterinarios acumulados de distintos rescates.
      </p>
    </section>
  `,
})
export class CurrentDebtCardComponent {
  protected readonly formattedDebt = formatArs(DONATION_CONFIG.currentDebt);
}
