import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AppFooterComponent } from '../../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../../shared/components/bottom-navigation/bottom-navigation.component';
import { PublicCommerceApiService } from '../../core/public-commerce-api.service';
import { PublicProduct } from '../../core/commerce.models';
import { formatArsFromCents } from '../../core/money.util';
import { productPriceLabel, selectCoverMedia } from '../../core/product-media.util';

@Component({
  standalone: true,
  imports: [RouterLink, AppHeaderComponent, AppFooterComponent, BottomNavigationComponent],
  template: `
    <app-header />
    <main id="contenido" class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section class="max-w-3xl">
        <p class="text-sm font-extrabold uppercase tracking-wide text-[var(--color-accent)]">Tienda solidaria</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Productos que ayudan.</h1>
        <p class="mt-4 text-lg text-[var(--color-text-muted)]">
          Cada compra colabora con tratamientos, alimento y cuidados.
        </p>
      </section>

      @if (loading()) {
        <div class="mt-12 rounded-2xl border border-[var(--color-border)] p-8 text-[var(--color-text-muted)]">
          Cargando tienda...
        </div>
      } @else if (error()) {
        <div class="mt-12 rounded-2xl border border-[var(--color-border)] p-8" role="alert">
          <p class="font-bold">No pudimos cargar la tienda en este momento.</p>
          <button class="button-primary mt-4 rounded-full px-5 py-2 font-extrabold" type="button" (click)="load()">
            Reintentar
          </button>
        </div>
      } @else if (products().length) {
        <section class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          @for (product of products(); track product.id) {
            <article class="group border-b border-[var(--color-border)] pb-6">
              <a [routerLink]="['/tienda', product.slug]" class="block" [attr.aria-label]="'Ver producto ' + product.name">
                <div class="aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-surface)]">
                  @if (cover(product); as media) {
                    <img
                      class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      [src]="media.url"
                      [alt]="media.alt"
                      loading="lazy"
                      decoding="async"
                    />
                  } @else {
                    <div class="grid h-full place-items-center px-6 text-center text-sm font-bold text-[var(--color-text-muted)]">
                      Gatarsis
                    </div>
                  }
                </div>
                <div class="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 class="text-xl font-black">{{ product.name }}</h2>
                    @if (product.shortDescription) {
                      <p class="mt-1 text-sm text-[var(--color-text-muted)]">{{ product.shortDescription }}</p>
                    }
                    <p class="mt-2 text-sm font-bold text-[var(--color-text-muted)]">{{ stockLabel(product) }}</p>
                  </div>
                  <p class="shrink-0 font-black">{{ priceLabel(product) }}</p>
                </div>
                <span class="mt-4 inline-flex text-sm font-extrabold text-[var(--color-accent)]">Ver producto</span>
              </a>
            </article>
          }
        </section>
      } @else {
        <div class="mt-12 rounded-2xl border border-[var(--color-border)] p-8">
          <p class="text-xl font-black">La tienda está preparando una nueva tanda.</p>
          <p class="mt-2 text-[var(--color-text-muted)]">Volvé pronto para ver los próximos productos solidarios.</p>
        </div>
      }
    </main>
    <app-footer />
    <app-bottom-navigation />
  `,
})
export class ShopPageComponent implements OnInit {
  readonly products = signal<PublicProduct[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);

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
    const total = product.variants.reduce((sum, variant) => sum + variant.availableStock, 0);
    return total > 0 ? 'Disponible' : 'Sin stock';
  }
}
