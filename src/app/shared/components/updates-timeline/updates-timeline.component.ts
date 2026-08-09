import { Component, input } from '@angular/core';

import { RescueCaseUpdate } from '../../../core/models/rescue-case.model';
import { formatDateDayMonth } from '../../../core/utils/format-date';

@Component({
  selector: 'app-updates-timeline',
  template: `
    <section>
      <h2 class="text-3xl font-extrabold">Historial clínico</h2>
      <div class="mt-7 max-w-[68ch] space-y-12 border-l border-[var(--color-border)] pl-7 md:space-y-14 md:pl-8">
        @for (update of updates(); track update.date + update.title) {
          <article class="relative">
            <span
              aria-hidden="true"
              class="absolute -left-[2.1rem] top-1 h-3 w-3 rounded-full border-2 border-white bg-[var(--color-recovering)] md:-left-[2.35rem]"
            ></span>
            <time class="text-xs font-extrabold uppercase text-[var(--color-recovering)]">
              {{ formatDate(update.date) }}
            </time>
            <h3 class="mt-3 text-xl font-extrabold leading-snug">{{ update.title }}</h3>
            @for (paragraph of update.paragraphs; track paragraph) {
              <p class="mt-4 leading-7 text-[var(--color-text-muted)]">{{ paragraph }}</p>
            }
          </article>
        }
      </div>
    </section>
  `
})
export class UpdatesTimelineComponent {
  readonly updates = input.required<readonly RescueCaseUpdate[]>();
  protected readonly formatDate = formatDateDayMonth;
}
