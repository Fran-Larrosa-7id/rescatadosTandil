import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AppFooterComponent } from '../../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../../shared/components/bottom-navigation/bottom-navigation.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { PublicCommerceApiService } from '../../core/public-commerce-api.service';
import { PublicProduct } from '../../core/commerce.models';
import { formatArsFromCents } from '../../core/money.util';
import { productPriceLabel, selectCoverMedia } from '../../core/product-media.util';

type ProductSort = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

@Component({
  standalone: true,
  imports: [
    RouterLink,
    AppHeaderComponent,
    AppFooterComponent,
    BottomNavigationComponent,
    IconComponent,
  ],
  template: `
    <app-header />
    <main id="contenido" class="mx-auto max-w-7xl flex-1 px-4 py-10 pb-28 sm:px-6 sm:pb-10 lg:px-8">
      <section class="max-w-3xl">
        <p class="text-sm font-extrabold uppercase tracking-wide text-[var(--color-accent)]">
          Tienda online
        </p>

        <p class="mt-4 text-lg text-[var(--color-text-muted)]">
          Encontrá nuestros productos y conocé otra forma de acompañar nuestros rescates.
        </p>
      </section>

      @if (loading()) {
        <div
          class="mt-12 rounded-2xl border border-[var(--color-border)] p-8 text-[var(--color-text-muted)]"
        >
          Cargando tienda...
        </div>
      } @else if (error()) {
        <div class="mt-12 rounded-2xl border border-[var(--color-border)] p-8" role="alert">
          <p class="font-bold">No pudimos cargar la tienda en este momento.</p>
          <button
            class="button-primary mt-4 rounded-full px-5 py-2 font-extrabold"
            type="button"
            (click)="load()"
          >
            Reintentar
          </button>
        </div>
      } @else if (products().length) {
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <label class="grid gap-1 text-sm font-bold text-[var(--color-text-muted)]">
            Ordenar por:
            <select
              class="soft-chip min-h-11 rounded-xl border px-3 text-sm font-bold text-[var(--color-text)]"
              [value]="sort()"
              (change)="setSort($any($event.target).value)"
            >
              <option value="name-asc">Nombre: A-Z</option>
              <option value="name-desc">Nombre: Z-A</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
            </select>
          </label>
        </div>

        <section
          class="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-5 sm:gap-6"
        >
            @for (product of visibleProducts(); track product.id) {
              <article
                class="group max-sm:rounded-2xl max-sm:border max-sm:border-[var(--color-border)] max-sm:bg-[var(--color-card)] max-sm:p-3 max-sm:shadow-[0_8px_20px_rgba(58,45,72,0.06)]"
              >
                <a
                  [routerLink]="['/tienda', product.slug]"
                  class="block"
                  [attr.aria-label]="'Ver producto ' + product.name"
                >
                  <div
                    class="product-media-hover relative aspect-[3/2] overflow-hidden rounded-2xl bg-[var(--color-surface)] transition-shadow duration-200 ease-out group-hover:shadow-[0_12px_24px_rgba(58,45,72,0.14)]"
                  >
                    @if (cover(product); as media) {
                      <img
                        class="h-full w-full object-cover"
                        [src]="media.url"
                        [alt]="media.alt"
                        loading="lazy"
                        decoding="async"
                      />
                    } @else {
                      <div
                        class="grid h-full place-items-center px-6 text-center text-sm font-bold text-[var(--color-text-muted)]"
                      >
                        Gatarsis
                      </div>
                    }
                  </div>
                  <div class="mt-4 flex items-start justify-between gap-4">
                    <div class="min-w-0">
                      <h2 class="text-xl font-black">{{ product.name }}</h2>
                      @if (product.shortDescription) {
                        <p class="mt-1 text-sm text-[var(--color-text-muted)]">
                          {{ product.shortDescription }}
                        </p>
                      }
                    </div>
                    <p class="shrink-0 text-lg font-black">{{ priceLabel(product) }}</p>
                  </div>
                  <div
                    class="mt-3 flex items-center justify-between gap-4 border-t border-[var(--color-border)] pt-3"
                  >
                    <p class="text-sm font-bold text-[var(--color-text-muted)]">
                      {{ stockLabel(product) }}
                    </p>
                    <span
                      class="inline-flex items-center gap-1 text-sm font-extrabold text-[var(--color-accent)]"
                      >Ver producto <app-icon name="arrow" class="size-4"
                    /></span>
                  </div>
                </a>
              </article>
            }
        </section>
      } @else {
        <div class="mt-12 rounded-2xl border border-[var(--color-border)] p-8">
          <p class="text-xl font-black">La tienda está preparando una nueva tanda.</p>
          <p class="mt-2 text-[var(--color-text-muted)]">
            Volvé pronto para ver los próximos productos solidarios.
          </p>
        </div>
      }
    </main>
    <app-footer />
    <app-bottom-navigation />
  `,
  styles: `
    :host {
      display: flex;
      min-height: 100dvh;
      flex-direction: column;
    }
  `,
})
export class ShopPageComponent implements OnInit {
  readonly products = signal<PublicProduct[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly sort = signal<ProductSort>('name-asc');
  readonly visibleProducts = computed(() => {
    const direction = this.sort() === 'name-desc' ? -1 : 1;

    return [...this.products()].sort((left, right) => {
      if (this.sort() === 'price-asc' || this.sort() === 'price-desc') {
        const leftPrice = this.lowestSellablePrice(left);
        const rightPrice = this.lowestSellablePrice(right);
        if (!Number.isFinite(leftPrice)) return Number.isFinite(rightPrice) ? 1 : 0;
        if (!Number.isFinite(rightPrice)) return -1;
        if (leftPrice !== rightPrice) {
          return this.sort() === 'price-asc' ? leftPrice - rightPrice : rightPrice - leftPrice;
        }
      }
      return direction * left.name.localeCompare(right.name, 'es', { sensitivity: 'base' });
    });
  });

  constructor(private readonly api: PublicCommerceApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.api
      .products()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (products) => this.products.set(products),
        error: () => this.error.set(true),
      });
  }

  cover(product: PublicProduct) {
    return selectCoverMedia(product);
  }

  priceLabel(product: PublicProduct): string {
    return productPriceLabel(product, formatArsFromCents);
  }

  stockLabel(product: PublicProduct): string {
    const total = this.totalAvailableStock(product);
    return total > 0 ? 'Disponible' : 'Sin stock';
  }

  setSort(value: string): void {
    if (
      value === 'name-asc' ||
      value === 'name-desc' ||
      value === 'price-asc' ||
      value === 'price-desc'
    ) {
      this.sort.set(value);
    }
  }

  private totalAvailableStock(product: PublicProduct): number {
    return product.variants.reduce((sum, variant) => sum + variant.availableStock, 0);
  }

  private lowestSellablePrice(product: PublicProduct): number {
    const prices = product.variants
      .filter((variant) => variant.availableStock > 0 && variant.priceInCents > 0)
      .map((variant) => variant.priceInCents);
    return prices.length ? Math.min(...prices) : Number.POSITIVE_INFINITY;
  }
}
