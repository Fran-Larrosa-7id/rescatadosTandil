import { Component, computed, input, signal } from '@angular/core';

import { RescueCaseUpdate } from '../../../core/models/rescue-case.model';
import { formatDateDayMonth } from '../../../core/utils/format-date';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-updates-timeline',
  imports: [IconComponent],
  template: `
    <section id="historial-clinico" class="scroll-mt-24">
      <h2 class="text-3xl font-extrabold">Historial clínico</h2>
      <div class="mt-7 max-w-[68ch] space-y-12 border-l border-[var(--color-border)] pl-7 md:space-y-14 md:pl-8">
        @if (latestUpdate(); as update) {
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

        @if (previousUpdates().length > 0) {
          <div
            id="historial-clinico-anterior"
            class="space-y-12 md:block md:space-y-14"
            [class.hidden]="!isClinicalHistoryExpanded()"
          >
            @for (update of previousUpdates(); track update.date + update.title) {
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

          <button
            type="button"
            class="inline-flex min-h-11 items-center gap-2 font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] md:hidden"
            [attr.aria-expanded]="isClinicalHistoryExpanded()"
            aria-controls="historial-clinico-anterior"
            (click)="isClinicalHistoryExpanded.set(!isClinicalHistoryExpanded())"
          >
            {{ isClinicalHistoryExpanded() ? 'Ocultar registros anteriores' : previousHistoryLabel() }}
            <app-icon name="chevron" class="size-4 transition" [class.rotate-90]="isClinicalHistoryExpanded()" />
          </button>
        }
      </div>
    </section>
  `
})
export class UpdatesTimelineComponent {
  readonly updates = input.required<readonly RescueCaseUpdate[]>();
  protected readonly isClinicalHistoryExpanded = signal(false);
  protected readonly latestUpdate = computed(() => this.updates()[0] ?? null);
  protected readonly previousUpdates = computed(() => this.updates().slice(1));
  protected readonly formatDate = formatDateDayMonth;

  protected previousHistoryLabel(): string {
    const count = this.previousUpdates().length;
    return count === 1 ? 'Ver registro anterior' : `Ver ${count} registros anteriores`;
  }
}
