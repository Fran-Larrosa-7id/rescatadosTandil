import { Component, input } from '@angular/core';

import { RescueNeed } from '../../../core/models/rescue-case.model';
import { formatDateNumeric } from '../../../core/utils/format-date';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-current-needs',
  imports: [IconComponent],
  template: `
    <section id="necesidades" class="surface-warm scroll-mt-24 rounded-2xl border p-6">
      <h2 class="text-2xl font-extrabold text-[var(--color-accent)]">Qué necesita hoy</h2>
      @if (updatedAt()) {
        <p class="mt-1 text-sm font-medium text-[var(--color-text-muted)]">
          Situación al {{ formatDate(updatedAt()!) }}
        </p>
      }
      <ul class="mt-5 space-y-4">
        @for (need of needs(); track need.title) {
          <li class="flex gap-3">
            <app-icon name="check" class="mt-0.5 size-5 text-[var(--color-recovering)]" />
            <div>
              <h3 class="font-bold">{{ need.title }}</h3>
              @if (need.description) {
                <p class="text-sm text-[var(--color-text-muted)]">{{ need.description }}</p>
              }
            </div>
          </li>
        }
      </ul>
    </section>
  `
})
export class CurrentNeedsComponent {
  readonly needs = input.required<readonly RescueNeed[]>();
  readonly updatedAt = input<string | null | undefined>(null);
  protected readonly formatDate = formatDateNumeric;
}
