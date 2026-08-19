import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AppFooterComponent } from '../../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../../shared/components/bottom-navigation/bottom-navigation.component';
import { CartStore } from '../../core/cart.store';
import { PublicProduct, PublicProductMedia, PublicProductVariant } from '../../core/commerce.models';
import { formatArsFromCents } from '../../core/money.util';
import {
  galleryForVariant,
  productPriceLabel,
  selectGalleryCover,
  selectVariantDisplayMedia,
} from '../../core/product-media.util';
import { PublicCommerceApiService } from '../../core/public-commerce-api.service';

@Component({
  standalone: true,
  imports: [RouterLink, AppHeaderComponent, AppFooterComponent, BottomNavigationComponent],
  template: `
    <app-header />
    <main id="contenido" class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <a routerLink="/tienda" class="text-sm font-bold text-[var(--color-accent)]">Volver a tienda</a>

      @if (loading()) {
        <div class="mt-10 rounded-2xl border border-[var(--color-border)] p-8">Cargando producto...</div>
      } @else if (error()) {
        <div class="mt-10 rounded-2xl border border-[var(--color-border)] p-8" role="alert">
          No pudimos cargar este producto.
        </div>
      } @else if (product(); as item) {
        <section class="mt-8 grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div class="aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-surface)]">
              @if (selectedMedia(); as media) {
                <img class="h-full w-full object-cover" [src]="media.url" [alt]="media.alt" decoding="async" />
              } @else {
                <div class="grid h-full place-items-center font-black text-[var(--color-text-muted)]">Gatarsis</div>
              }
            </div>
            @if (galleryMedia(item).length > 1) {
              <div class="mt-4 flex gap-3 overflow-auto">
                @for (media of galleryMedia(item); track media.id) {
                  <button
                    type="button"
                    class="size-20 shrink-0 overflow-hidden rounded-xl border border-[var(--color-border)]"
                    (click)="selectedMedia.set(media)"
                    [attr.aria-label]="'Ver imagen ' + media.alt"
                  >
                    <img class="h-full w-full object-cover" [src]="media.url" [alt]="media.alt" loading="lazy" />
                  </button>
                }
              </div>
            }
          </div>

          <div class="lg:pt-8">
            <p class="text-sm font-extrabold uppercase tracking-wide text-[var(--color-accent)]">Tienda Gatarsis</p>
            <h1 class="mt-3 text-4xl font-black">{{ item.name }}</h1>
            @if (item.shortDescription) {
              <p class="mt-4 text-lg text-[var(--color-text-muted)]">{{ item.shortDescription }}</p>
            }
            <p class="mt-6 text-2xl font-black">{{ priceLabel(item) }}</p>

            <fieldset class="mt-8">
              <legend class="text-sm font-extrabold uppercase tracking-wide text-[var(--color-text-muted)]">Variante</legend>
              <div class="mt-3 grid gap-3">
                @for (variant of item.variants; track variant.id) {
                  <button
                    type="button"
                    class="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-left disabled:opacity-50"
                    [style.border-color]="selectedVariant()?.id === variant.id ? 'var(--color-accent)' : null"
                    [disabled]="variant.availableStock <= 0"
                    (click)="selectVariant(variant)"
                  >
                    <span>
                      <strong>{{ variant.name }}</strong>
                      <small class="block text-[var(--color-text-muted)]">
                        {{ variantMeta(variant) }} · {{ variant.sku }}
                      </small>
                    </span>
                    <span class="font-black">{{ money(variant.priceInCents) }}</span>
                  </button>
                }
              </div>
            </fieldset>

            @if (selectedVariant(); as variant) {
              <p class="mt-5 font-bold">{{ stockText(variant) }}</p>
              <div class="mt-5 flex items-center gap-3">
                <button class="rounded-full border border-[var(--color-border)] px-4 py-2" type="button" aria-label="Disminuir cantidad" (click)="quantity.set(max(1, quantity() - 1))">-</button>
                <span class="min-w-8 text-center font-black">{{ quantity() }}</span>
                <button class="rounded-full border border-[var(--color-border)] px-4 py-2" type="button" aria-label="Aumentar cantidad" (click)="quantity.set(min(variant.availableStock, quantity() + 1))">+</button>
              </div>
              <button
                class="button-primary mt-6 min-h-12 rounded-full px-7 font-extrabold disabled:opacity-50"
                type="button"
                [disabled]="variant.availableStock <= 0"
                (click)="addToCart(item, variant)"
              >
                Agregar al carrito
              </button>
              @if (added()) {
                <p class="mt-3 font-bold text-[#23623a]" aria-live="polite">Producto agregado al carrito.</p>
              }
            } @else {
              <p class="mt-5 font-bold text-[var(--color-text-muted)]">Sin stock.</p>
            }
            <p class="mt-5 text-sm text-[var(--color-text-muted)]">El stock se reserva recién al iniciar el pago.</p>
          </div>
        </section>
      }
    </main>
    <app-footer />
    <app-bottom-navigation />
  `,
})
export class ProductDetailPageComponent implements OnInit {
  readonly product = signal<PublicProduct | null>(null);
  readonly selectedMedia = signal<PublicProductMedia | null>(null);
  readonly selectedVariant = signal<PublicProductVariant | null>(null);
  readonly quantity = signal(1);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly added = signal(false);
  readonly min = Math.min;
  readonly max = Math.max;

  constructor(
    private readonly api: PublicCommerceApiService,
    private readonly route: ActivatedRoute,
    private readonly cart: CartStore,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.api
      .products()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (products) => {
          const product = products.find((item) => item.slug === slug) ?? null;
          this.product.set(product);
          const variant = product?.variants.find((item) => item.availableStock > 0) ?? null;
          this.selectedVariant.set(variant);
          this.selectedMedia.set(product ? selectGalleryCover(galleryForVariant(product, variant)) : null);
          this.error.set(!product);
        },
        error: () => this.error.set(true),
      });
  }

  galleryMedia(product: PublicProduct): PublicProductMedia[] {
    return galleryForVariant(product, this.selectedVariant());
  }

  selectVariant(variant: PublicProductVariant): void {
    this.selectedVariant.set(variant);
    const product = this.product();
    this.selectedMedia.set(product ? selectGalleryCover(galleryForVariant(product, variant)) : null);
    this.quantity.set(1);
  }

  addToCart(product: PublicProduct, variant: PublicProductVariant): void {
    this.cart.add({
      variantId: variant.id,
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      variantName: variant.name,
      sku: variant.sku,
      unitPriceInCents: variant.priceInCents,
      quantity: this.quantity(),
      availableStock: variant.availableStock,
      imageUrl: selectVariantDisplayMedia(product, variant)?.url ?? null,
    });
    this.added.set(true);
  }

  priceLabel(product: PublicProduct): string {
    return productPriceLabel(product, formatArsFromCents);
  }

  money(value: number): string {
    return formatArsFromCents(value);
  }

  stockText(variant: PublicProductVariant): string {
    if (variant.availableStock <= 0) return 'Sin stock';
    return variant.availableStock <= 3 ? `Quedan ${variant.availableStock}` : 'Disponible';
  }

  variantMeta(variant: PublicProductVariant): string {
    return [variant.color, variant.size].filter(Boolean).join(' / ') || 'Variante';
  }
}
