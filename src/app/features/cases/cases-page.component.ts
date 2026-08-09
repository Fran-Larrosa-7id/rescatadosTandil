import { Component, computed, inject, signal } from '@angular/core';

import {
  CASE_STATUS_META,
  RescueCaseStatus
} from '../../core/models/rescue-case.model';
import { RescueCasesService } from '../../core/services/rescue-cases.service';
import { AppFooterComponent } from '../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../shared/components/bottom-navigation/bottom-navigation.component';
import { CaseCardComponent } from '../../shared/components/case-card/case-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

type CaseFilter = RescueCaseStatus | 'all';

@Component({
  selector: 'app-cases-page',
  imports: [
    AppHeaderComponent,
    AppFooterComponent,
    BottomNavigationComponent,
    CaseCardComponent,
    EmptyStateComponent
  ],
  template: `
    <app-header />

    <main id="contenido" class="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div class="max-w-3xl">
        <h1 class="text-5xl font-black leading-tight">Casos y rescates</h1>
        <p class="mt-3 text-lg text-[var(--color-text-muted)]">
          Conocé a los callejeritos que estamos ayudando. Cada historia es única y tu aporte, por
          más pequeño que sea, cambia sus vidas.
        </p>
      </div>

      <div class="-mx-4 mt-8 flex gap-3 overflow-x-auto px-4 pb-2" aria-label="Filtrar casos">
        @for (filter of filters; track filter.value) {
          <button
            type="button"
            [class]="filterClass(filter.value)"
            (click)="activeFilter.set(filter.value)"
          >
            {{ filter.label }}
          </button>
        }
      </div>

      <section class="mt-8">
        @if (filteredCases().length > 0) {
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            @for (item of filteredCases(); track item.slug) {
              <app-case-card [item]="item" />
            }
          </div>
        } @else {
          <app-empty-state message="No hay casos con este estado por el momento." />
        }
      </section>
    </main>

    <app-footer />
    <app-bottom-navigation />
  `
})
export class CasesPageComponent {
  private readonly casesService = inject(RescueCasesService);

  protected readonly activeFilter = signal<CaseFilter>('all');
  protected readonly filters: readonly { readonly value: CaseFilter; readonly label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'needs-help', label: CASE_STATUS_META['needs-help'].label },
    { value: 'treatment', label: CASE_STATUS_META.treatment.label },
    { value: 'recovering', label: CASE_STATUS_META.recovering.label },
    { value: 'closed', label: CASE_STATUS_META.closed.label },
    { value: 'memorial', label: CASE_STATUS_META.memorial.label }
  ];
  protected readonly filteredCases = computed(() => this.casesService.getByStatus(this.activeFilter()));

  protected filterClass(value: CaseFilter): string {
    const baseClasses = 'min-h-11 shrink-0 rounded-full border px-5 text-sm font-bold transition';
    const stateClasses =
      this.activeFilter() === value
        ? 'bg-[var(--color-text)] text-white border-[var(--color-text)]'
        : 'bg-white border-[var(--color-border)] text-[var(--color-text)]';

    return `${baseClasses} ${stateClasses}`;
  }
}
