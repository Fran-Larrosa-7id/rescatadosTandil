import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';

import { RescueImage } from '../../../core/models/rescue-image.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-case-gallery',
  imports: [NgOptimizedImage, IconComponent],
  template: `
    <div class="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)]/70 p-2 shadow-sm sm:p-3">
      <button
        type="button"
        class="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--color-surface)] text-left shadow-sm md:aspect-[16/10]"
        (click)="open(0)"
        aria-label="Abrir foto principal en tamaño completo"
      >
        <img
          class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
          [ngSrc]="cover().src"
          [alt]="cover().alt"
          [style.object-position]="cover().objectPosition ?? 'center'"
          fill
          sizes="(min-width: 1280px) 56vw, (min-width: 1024px) 60vw, 100vw"
        />
        <span class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent opacity-90"></span>
        <span class="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
          {{ allImages().length }} fotos
        </span>
        <span
          class="gallery-expand-control absolute bottom-3 right-3 inline-flex size-10 items-center justify-center rounded-full text-[var(--color-text)] shadow-sm backdrop-blur transition duration-300 group-hover:scale-110"
          title="Ampliar foto"
          aria-hidden="true"
        >
          <app-icon name="expand" class="size-5" />
        </span>
      </button>

      @if (gallery().length > 0) {
        <div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          @for (image of gallery(); track image.src; let index = $index) {
            <button
              type="button"
              class="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              (click)="open(index + 1)"
              [attr.aria-label]="'Abrir foto ' + (index + 2) + ' en tamaño completo'"
            >
              <img
                class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                [ngSrc]="image.src"
                [alt]="image.alt"
                [style.object-position]="image.objectPosition ?? 'center'"
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                loading="lazy"
              />
              <span class="absolute inset-0 bg-black/0 transition group-hover:bg-black/10"></span>
            </button>
          }
        </div>
      }
    </div>
  `
})
export class CaseGalleryComponent {
  readonly cover = input.required<RescueImage>();
  readonly gallery = input<readonly RescueImage[]>([]);

  protected readonly allImages = computed(() => [this.cover(), ...this.gallery()]);

  protected async open(index: number): Promise<void> {
    const { default: PhotoSwipe } = await import('photoswipe');
    const gallery = new PhotoSwipe({
      dataSource: this.allImages(),
      index,
      bgOpacity: 0.92,
      showHideAnimationType: 'zoom',
      wheelToZoom: true,
      padding: { top: 24, bottom: 24, left: 24, right: 24 }
    });

    gallery.init();
  }
}
