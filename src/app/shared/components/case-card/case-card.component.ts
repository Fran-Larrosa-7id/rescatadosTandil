import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RescueCase } from '../../../core/models/rescue-case.model';
import { IconComponent } from '../icon/icon.component';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
  selector: 'app-case-card',
  imports: [RouterLink, NgOptimizedImage, IconComponent, StatusBadgeComponent],
  template: `
    <article class="case-card surface-card dark-neon-card dark-neon-card--featured relative rounded-2xl border transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)]">
      <a [routerLink]="['/casos', item().slug]" class="group block">
        <div class="relative aspect-[7/5] overflow-hidden rounded-t-2xl bg-[var(--color-surface)]">
          <img
            class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            [ngSrc]="item().coverImage.src"
            [alt]="item().coverImage.alt"
            [style.object-position]="item().coverImage.objectPosition ?? 'center'"
            fill
            loading="lazy"
          />
          <div class="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-2">
            @for (status of item().statuses; track status) {
              <app-status-badge [status]="status" />
            }
          </div>
        </div>
        <div class="relative p-5">
          <span class="case-card-heart absolute right-5 top-4 grid size-10 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-accent)]" aria-hidden="true">
            <app-icon name="heart" class="size-5" />
          </span>
          <h3 class="pr-12 text-2xl font-extrabold text-[var(--color-text)]">{{ item().name }}</h3>
          <p class="mt-2 line-clamp-3 text-sm leading-6 text-[var(--color-text-muted)]">{{ item().summary }}</p>
          <div class="mt-5 border-t border-[var(--color-border)] pt-4">
            <span class="inline-flex items-center gap-2 text-sm font-extrabold text-[var(--color-accent)]">
              Ver historia
              <app-icon name="arrow" class="size-4" />
            </span>
          </div>
        </div>
      </a>
    </article>
  `
  ,
  styles: `
    .case-card {
      box-shadow: 0 12px 30px color-mix(in srgb, var(--color-text) 6%, transparent);
    }

    .case-card-heart {
      background: color-mix(in srgb, var(--color-card) 88%, transparent);
    }

    :host-context(.dark) .case-card-heart {
      background: rgba(42, 33, 58, 0.9);
    }
  `
})
export class CaseCardComponent {
  readonly item = input.required<RescueCase>();
}
