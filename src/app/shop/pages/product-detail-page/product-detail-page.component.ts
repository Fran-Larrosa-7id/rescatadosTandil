import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AppFooterComponent } from '../../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../../shared/components/bottom-navigation/bottom-navigation.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CartStore } from '../../core/cart.store';
import {
  PublicProduct,
  PublicProductMedia,
  PublicProductVariant,
} from '../../core/commerce.models';
import { formatArsFromCents } from '../../core/money.util';
import {
  galleryForVariant,
  productPriceLabel,
  selectGalleryCover,
  selectVariantDisplayMedia,
} from '../../core/product-media.util';
import { PublicCommerceApiService } from '../../core/public-commerce-api.service';
import { publicVariantLabel, variantColor } from '../../core/variant-color.util';
import { PhotoSwipeService } from '../../../core/services/photo-swipe.service';

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
    <main id="contenido" class="mx-auto max-w-7xl px-4 py-8 pb-28 sm:px-6 sm:py-10 lg:px-8">
      <a
        routerLink="/tienda"
        class="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--color-accent)]"
      >
        <app-icon name="arrow" class="size-4 rotate-180" /> Volver a tienda
      </a>

      @if (loading()) {
        <div class="mt-10 rounded-2xl border border-[var(--color-border)] p-8">
          Cargando producto...
        </div>
      } @else if (error()) {
        <div class="mt-10 rounded-2xl border border-[var(--color-border)] p-8" role="alert">
          No pudimos cargar este producto.
        </div>
      } @else if (product(); as item) {
        <section class="mt-6 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
          <div>
            <button
              type="button"
              class="group relative block aspect-[3/2] w-full overflow-hidden rounded-3xl border-0 bg-[var(--color-surface)] p-0 text-left lg:aspect-[4/5]"
              (click)="openGallery(item)"
              aria-label="Abrir galería de producto en tamaño completo"
            >
              @if (selectedMedia(); as media) {
                <img
                  class="h-full w-full object-cover"
                  [src]="media.url"
                  [alt]="media.alt"
                  decoding="async"
                />
              } @else {
                <div
                  class="grid h-full place-items-center font-black text-[var(--color-text-muted)]"
                >
                  Gatarsis
                </div>
              }
              @if (galleryMedia(item).length) {
                <span class="gallery-expand-control absolute bottom-3 right-3 inline-flex size-10 items-center justify-center rounded-full text-[var(--color-text)] shadow-sm backdrop-blur transition group-hover:scale-105" aria-hidden="true"><app-icon name="expand" class="size-5" /></span>
              }
            </button>
            @if (galleryMedia(item).length > 1) {
              <div class="mt-4 flex gap-3 overflow-auto">
                @for (media of galleryMedia(item); track media.id) {
                  <button
                    type="button"
                    class="size-20 shrink-0 overflow-hidden rounded-xl border border-[var(--color-border)]"
                    (click)="selectedMedia.set(media)"
                    [attr.aria-label]="'Ver imagen ' + media.alt"
                  >
                    <img
                      class="h-full w-full object-cover"
                      [src]="media.url"
                      [alt]="media.alt"
                      loading="lazy"
                    />
                  </button>
                }
              </div>
            }
          </div>

          <div class="lg:pt-4">
            <p class="text-sm font-extrabold uppercase tracking-wide text-[var(--color-accent)]">
              Tienda Gatarsis
            </p>
            <h1 class="mt-2 text-4xl font-black tracking-tight">{{ item.name }}</h1>
            @if (item.shortDescription) {
              <p class="mt-4 text-lg text-[var(--color-text-muted)]">{{ item.shortDescription }}</p>
            }
            <p class="mt-5 text-3xl font-black transition-opacity">{{ priceLabel(item) }}</p>

            <fieldset class="mt-8">
              <legend
                class="text-sm font-extrabold uppercase tracking-wide text-[var(--color-text-muted)]"
              >
                Variante
              </legend>
              <div class="mt-3 grid gap-2 sm:grid-cols-2">
                @for (variant of item.variants; track variant.id) {
                  <button
                    type="button"
                    class="flex min-h-14 items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3.5 py-2.5 text-left transition hover:border-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
                    [style.border-color]="
                      selectedVariant()?.id === variant.id ? 'var(--color-accent)' : null
                    "
                    [disabled]="variant.availableStock <= 0"
                    [attr.aria-pressed]="selectedVariant()?.id === variant.id"
                    (click)="selectVariant(variant)"
                  >
                    <span class="flex min-w-0 items-center gap-2">
                      @if (colorDot(variant); as color) {
                        <span
                          class="size-3 shrink-0 rounded-full border border-black/15"
                          [style.background-color]="color"
                        ></span>
                      }
                      <strong>{{ variantMeta(variant) }}</strong>
                    </span>
                    <span class="font-black">{{ money(variant.priceInCents) }}</span>
                  </button>
                }
              </div>
            </fieldset>

            @if (selectedVariant(); as variant) {
              <p class="mt-5 font-bold" [class.text-[#23623a]]="variant.availableStock > 0">
                {{ stockText(variant) }}
              </p>
              <div class="flex gap-4">
                <div
                  class="mt-4 inline-flex items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-1"
                >
                  <button
                    class="grid size-10 place-items-center rounded-lg transition hover:bg-[var(--color-recovering-bg)]"
                    type="button"
                    aria-label="Disminuir cantidad"
                    (click)="quantity.set(max(1, quantity() - 1))"
                  >
                    <app-icon name="minus" class="size-4" />
                  </button>
                  <span class="min-w-10 text-center font-black">{{ quantity() }}</span>
                  <button
                    class="grid size-10 place-items-center rounded-lg transition hover:bg-[var(--color-recovering-bg)]"
                    type="button"
                    aria-label="Aumentar cantidad"
                    (click)="quantity.set(min(variant.availableStock, quantity() + 1))"
                  >
                    <app-icon name="plus" class="size-4" />
                  </button>
                </div>
                <button
                  class="text-[13px] button-primary mt-5 inline-flex min-h-12 w-full items-center justify-center gap-4 rounded-xl px-7 font-extrabold disabled:opacity-50 sm:w-auto"
                  type="button"
                  [disabled]="variant.availableStock <= 0"
                  (click)="addToCart(item, variant)"
                >
                  <app-icon name="wallet" class="size-5" />
                  {{ added() ? 'Agregado al carrito' : 'Agregar al carrito' }}
                </button>
              </div>

              @if (added()) {
                <p class="mt-3 font-bold text-[#23623a]" aria-live="polite">
                  Producto agregado al carrito.
                </p>
              }
            } @else {
              <p class="mt-5 font-bold text-[var(--color-text-muted)]">Sin stock.</p>
            }
            <p class="mt-5 text-sm text-[var(--color-text-muted)]">
              <app-icon name="info" class="mr-1 inline size-4 align-text-bottom" />
              El stock se reserva cuando iniciás el pago.
            </p>
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
  private readonly photoSwipe = inject(PhotoSwipeService);

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
          this.selectedMedia.set(
            product ? selectGalleryCover(galleryForVariant(product, variant)) : null,
          );
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
    this.selectedMedia.set(
      product ? selectGalleryCover(galleryForVariant(product, variant)) : null,
    );
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
    setTimeout(() => this.added.set(false), 2500);
  }

  priceLabel(product: PublicProduct): string {
    const variant = this.selectedVariant();
    return variant
      ? formatArsFromCents(variant.priceInCents)
      : productPriceLabel(product, formatArsFromCents);
  }

  money(value: number): string {
    return formatArsFromCents(value);
  }

  stockText(variant: PublicProductVariant): string {
    return variant.availableStock <= 0 ? 'Sin stock' : 'Disponible';
  }

  variantMeta(variant: PublicProductVariant): string {
    return publicVariantLabel(variant);
  }

  colorDot(variant: PublicProductVariant): string | null {
    return variantColor(variant);
  }

  async openGallery(product: PublicProduct): Promise<void> {
    const media = this.galleryMedia(product);
    const selectedId = this.selectedMedia()?.id;
    const index = Math.max(0, media.findIndex((item) => item.id === selectedId));
    await this.photoSwipe.open(
      media.map((item) => ({ src: item.url, alt: item.alt, width: 1600, height: 1200 })),
      index,
    );
  }
}
