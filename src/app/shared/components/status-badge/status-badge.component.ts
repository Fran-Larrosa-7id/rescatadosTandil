import { Component, computed, input } from '@angular/core';

import { CASE_STATUS_META, RescueCaseStatus } from '../../../core/models/rescue-case.model';

@Component({
  selector: 'app-status-badge',
  template: `
    <span class="case-status-badge inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold">
      <span aria-hidden="true" class="h-1.5 w-1.5 rounded-full bg-current"></span>
      {{ meta().label }}
    </span>
  `
})
export class StatusBadgeComponent {
  readonly status = input.required<RescueCaseStatus>();

  protected readonly meta = computed(() => CASE_STATUS_META[this.status()]);

}
