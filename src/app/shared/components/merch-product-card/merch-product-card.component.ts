import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';

import { MerchPreorderConfig } from '../../../core/config/merch-preorder.config';
import { MerchProduct } from '../../../core/models/merch-product.model';
import { PhotoSwipeService } from '../../../core/services/photo-swipe.service';
import { formatArs } from '../../../core/utils/format-ars';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-merch-product-card',
  imports: [NgOptimizedImage, IconComponent],
  template: `
    <article class="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-center" [class.lg:grid-flow-dense]="alternate()">
      <div class="min-w-0" [class.lg:col-start-2]="alternate()">
        <div class="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-2 shadow-sm sm:p-3">
          <button
            type="button"
            class="group relative block aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[var(--color-surface)] text-left"
            (click)="open(0)"
            [attr.aria-label]="'Ampliar ' + product().name"
          >
            <img
              class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
              [ngSrc]="product().coverImage.src"
              [alt]="product().coverImage.alt"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <span class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent"></span>
            <span class="gallery-expand-control absolute bottom-3 right-3 inline-flex size-10 items-center justify-center rounded-full text-[var(--color-text)] shadow-sm backdrop-blur transition duration-300 group-hover:scale-110" title="Ampliar foto" aria-hidden="true">
              <app-icon name="expand" class="size-5" />
            </span>
          </button>

          @if (product().gallery.length > 0) {
            <div class="mt-3 grid grid-cols-2 gap-3">
              @for (image of product().gallery; track image.src; let index = $index) {
                <button
                  type="button"
                  class="group relative aspect-[3/2] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-left"
                  (click)="open(index + 1)"
                  [attr.aria-label]="'Ampliar imagen ' + (index + 2) + ' de ' + product().name"
                >
                  <img
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                    [ngSrc]="image.src"
                    [alt]="image.alt"
                    fill
                    sizes="(min-width: 1024px) 28vw, 50vw"
                    loading="lazy"
                  />
                </button>
              }
            </div>
          }
        </div>
      </div>

      <div [class.lg:col-start-1]="alternate()">
        <p class="inline-flex rounded-full bg-[var(--color-recovering-bg)] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[var(--color-accent)]">
          Preventa
        </p>
        <h3 class="mt-4 text-3xl font-black">{{ product().name }}</h3>
        <p class="mt-2 text-lg font-bold text-[var(--color-accent)]">{{ product().tagline }}</p>
        <p class="mt-4 leading-7 text-[var(--color-text-muted)]">{{ product().description }}</p>

        <div class="mt-6">
          <p class="text-sm font-bold text-[var(--color-text-muted)]">Variantes disponibles</p>
          <div class="mt-3 flex flex-wrap gap-2">
            @for (variant of product().variants; track variant.id) {
              <span class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm font-bold">
                <span class="size-2.5 rounded-full border border-[var(--color-border)]" [class.bg-[#242129]]="variant.color === 'black'" [class.bg-white]="variant.color === 'white'" [class.bg-[var(--color-accent)]]="variant.color === 'lilac'"></span>
                {{ variant.name }}
              </span>
            }
          </div>
        </div>

        @if (product().price !== null) {
          <p class="mt-6 text-2xl font-black">{{ formatPrice(product().price!) }}</p>
        }

        @if (canReserve()) {
          <a [href]="preorder().contactUrl" target="_blank" rel="noopener noreferrer" class="button-primary mt-7 inline-flex min-h-12 items-center justify-center rounded-full px-7 font-extrabold shadow-sm">
            Reservar
            <app-icon name="arrow" class="ml-2 size-4" />
          </a>
        }
      </div>
    </article>
  `
})
export class MerchProductCardComponent {
  readonly product = input.required<MerchProduct>();
  readonly preorder = input.required<MerchPreorderConfig>();
  readonly alternate = input(false);

  private readonly photoSwipe = inject(PhotoSwipeService);
  protected readonly canReserve = computed(
    () => this.preorder().status === 'open' && this.preorder().contactUrl !== null
  );
  protected readonly formatPrice = formatArs;

  protected async open(index: number): Promise<void> {
    await this.photoSwipe.open([this.product().coverImage, ...this.product().gallery], index);
  }
}
