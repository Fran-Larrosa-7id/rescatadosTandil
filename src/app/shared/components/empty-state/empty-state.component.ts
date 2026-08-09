import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="rounded-2xl border border-dashed border-[var(--color-border)] bg-white p-8 text-center text-[var(--color-text-muted)]">
      {{ message() }}
    </div>
  `
})
export class EmptyStateComponent {
  readonly message = input('Todavía no hay casos para mostrar.');
}
