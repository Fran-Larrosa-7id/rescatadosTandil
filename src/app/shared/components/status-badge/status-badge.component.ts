import { Component, computed, input } from '@angular/core';

import { CASE_STATUS_META, RescueCaseStatus } from '../../../core/models/rescue-case.model';

@Component({
  selector: 'app-status-badge',
  template: `
    <span
      [class]="classes()"
    >
      <span aria-hidden="true" class="h-1.5 w-1.5 rounded-full bg-current"></span>
      {{ meta().label }}
    </span>
  `
})
export class StatusBadgeComponent {
  readonly status = input.required<RescueCaseStatus>();

  protected readonly meta = computed(() => CASE_STATUS_META[this.status()]);

  protected readonly classes = computed(() => {
    const baseClasses = 'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold';

    switch (this.meta().tone) {
      case 'danger':
        return `${baseClasses} border-[var(--color-accent-soft)] bg-[var(--color-danger-bg)] text-[var(--color-accent-soft)]`;
      case 'success':
        return `${baseClasses} border-[var(--color-recovering)] bg-[var(--color-recovering-bg)] text-[var(--color-recovering)]`;
      case 'muted':
        return `${baseClasses} border-[var(--color-border)] bg-white text-[var(--color-text-muted)]`;
      default:
        return `${baseClasses} border-[var(--color-text-muted)] bg-white text-[var(--color-text)]`;
    }
  });
}
