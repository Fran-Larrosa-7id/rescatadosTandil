import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

import { RescueImage } from '../../../core/models/rescue-image.model';

@Component({
  selector: 'app-case-gallery',
  imports: [NgOptimizedImage],
  template: `
    <div class="grid gap-3">
      <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-surface)] md:aspect-[3/2]">
        <img
          class="h-full w-full object-cover"
          [ngSrc]="cover().src"
          [alt]="cover().alt"
          [style.object-position]="cover().objectPosition ?? 'center'"
          fill
        />
      </div>

      @if (gallery().length > 0) {
        <div class="grid grid-cols-3 gap-3">
          @for (image of gallery(); track image.src) {
            <div class="relative aspect-square overflow-hidden rounded-lg bg-[var(--color-surface)]">
              <img
                class="h-full w-full object-cover"
                [ngSrc]="image.src"
                [alt]="image.alt"
                [style.object-position]="image.objectPosition ?? 'center'"
                fill
                loading="lazy"
              />
            </div>
          }
        </div>
      }
    </div>
  `
})
export class CaseGalleryComponent {
  readonly cover = input.required<RescueImage>();
  readonly gallery = input<readonly RescueImage[]>([]);
}
