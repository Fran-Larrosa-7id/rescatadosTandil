import { NgOptimizedImage } from '@angular/common';
import { Component, computed, HostListener, input, signal } from '@angular/core';

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
          sizes="(min-width: 1024px) 780px, 100vw"
        />
        <span class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent opacity-90"></span>
        <span class="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
          {{ allImages().length }} fotos
        </span>
        <span class="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-xs font-extrabold text-[var(--color-text)] shadow-sm backdrop-blur transition group-hover:bg-white">
          <app-icon name="spark" class="size-4" />
          Ver foto
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
                sizes="(min-width: 1024px) 250px, 50vw"
                loading="lazy"
              />
              <span class="absolute inset-0 bg-black/0 transition group-hover:bg-black/10"></span>
            </button>
          }
        </div>
      }
    </div>

    @if (selectedImage(); as image) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-label="Visor de fotos del caso"
        (click)="close()"
      >
        <div class="relative flex max-h-full w-full max-w-6xl items-center justify-center" (click)="$event.stopPropagation()">
          <img
            class="max-h-[82dvh] max-w-full rounded-2xl object-contain shadow-2xl"
            [ngSrc]="image.src"
            [alt]="image.alt"
            width="1600"
            height="1200"
            priority
          />

          <button
            type="button"
            class="absolute right-2 top-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-[var(--color-card)]/95 text-[var(--color-text)] shadow-sm"
            (click)="close()"
            aria-label="Cerrar visor de fotos"
          >
            <app-icon name="x" class="size-5" />
          </button>

          @if (allImages().length > 1) {
            <button
              type="button"
              class="absolute left-2 inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-[var(--color-card)]/95 text-[var(--color-text)] shadow-sm sm:left-4"
              (click)="previous()"
              aria-label="Ver foto anterior"
            >
              <app-icon name="arrow" class="size-5 rotate-180" />
            </button>
            <button
              type="button"
              class="absolute right-2 inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-[var(--color-card)]/95 text-[var(--color-text)] shadow-sm sm:right-4"
              (click)="next()"
              aria-label="Ver foto siguiente"
            >
              <app-icon name="arrow" class="size-5" />
            </button>
          }

          <p class="absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm font-medium text-white">
            {{ selectedPosition() }} de {{ allImages().length }}
          </p>
        </div>
      </div>
    }
  `
})
export class CaseGalleryComponent {
  readonly cover = input.required<RescueImage>();
  readonly gallery = input<readonly RescueImage[]>([]);

  protected readonly selectedIndex = signal<number | null>(null);
  protected readonly allImages = computed(() => [this.cover(), ...this.gallery()]);
  protected readonly selectedImage = computed(() => {
    const index = this.selectedIndex();

    return index === null ? null : this.allImages()[index] ?? null;
  });

  @HostListener('document:keydown.escape')
  protected closeFromKeyboard(): void {
    this.close();
  }

  protected open(index: number): void {
    this.selectedIndex.set(index);
  }

  protected close(): void {
    this.selectedIndex.set(null);
  }

  protected selectedPosition(): number {
    return (this.selectedIndex() ?? 0) + 1;
  }

  protected previous(): void {
    const index = this.selectedIndex();
    const total = this.allImages().length;

    if (index !== null && total > 0) {
      this.selectedIndex.set((index - 1 + total) % total);
    }
  }

  protected next(): void {
    const index = this.selectedIndex();
    const total = this.allImages().length;

    if (index !== null && total > 0) {
      this.selectedIndex.set((index + 1) % total);
    }
  }
}
