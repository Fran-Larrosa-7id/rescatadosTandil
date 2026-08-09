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
    <article class="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-sm">
      <a [routerLink]="['/casos', item().slug]" class="group block">
        <div class="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface)]">
          <img
            class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            [ngSrc]="item().coverImage.src"
            [alt]="item().coverImage.alt"
            [style.object-position]="item().coverImage.objectPosition ?? 'center'"
            fill
            loading="lazy"
          />
          <div class="absolute left-4 top-4">
            <app-status-badge [status]="item().status" />
          </div>
        </div>
        <div class="p-5">
          <h3 class="text-2xl font-extrabold">{{ item().name }}</h3>
          <p class="mt-2 line-clamp-3 text-[var(--color-text-muted)]">{{ item().summary }}</p>
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
})
export class CaseCardComponent {
  readonly item = input.required<RescueCase>();
}
