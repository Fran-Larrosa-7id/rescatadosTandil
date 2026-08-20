import { PublicProduct } from './commerce.models';
import { galleryForVariant, productPriceLabel, selectCoverMedia, selectVariantDisplayMedia } from './product-media.util';

describe('public product helpers', () => {
  it('selects cover media first, then sort order fallback', () => {
    const product = makeProduct({
      media: [
        { id: 'a', url: 'a.jpg', alt: 'A', sortOrder: 2, isCover: false },
        { id: 'b', url: 'b.jpg', alt: 'B', sortOrder: 1, isCover: true },
      ],
    });
    expect(selectCoverMedia(product)?.id).toBe('b');
    expect(selectCoverMedia(makeProduct({ media: [{ id: 'a', url: 'a.jpg', alt: 'A', sortOrder: 2, isCover: false }] }))?.id).toBe('a');
    expect(selectCoverMedia(makeProduct({ media: [] }))).toBeNull();
  });

  it('uses variant media as catalog fallback only when product general media is missing', () => {
    const product = makeProduct({
      media: [],
      variantMedia: [[{ id: 'variant-cover', url: 'variant.jpg', alt: 'Variant', sortOrder: 1, isCover: true }]],
    });

    expect(selectCoverMedia(product)?.id).toBe('variant-cover');
  });

  it('builds variant gallery with specific media and falls back to product media', () => {
    const product = makeProduct({
      media: [{ id: 'general', url: 'general.jpg', alt: 'General', sortOrder: 0, isCover: true }],
      variantMedia: [[{ id: 'specific', url: 'specific.jpg', alt: 'Specific', sortOrder: 0, isCover: true }], []],
    });

    expect(galleryForVariant(product, product.variants[0]).map((media) => media.id)).toEqual(['specific']);
    expect(galleryForVariant(product, product.variants[1]).map((media) => media.id)).toEqual(['general']);
    expect(selectVariantDisplayMedia(product, product.variants[0])?.id).toBe('specific');
  });

  it('shows the lowest configured price without adding a misleading prefix', () => {
    expect(productPriceLabel(makeProduct({ prices: [1500000, 1500000] }), money)).toBe('$15000');
    expect(productPriceLabel(makeProduct({ prices: [2500000, 1500000] }), money)).toBe('$15000');
  });
});

function money(value: number): string {
  return `$${value / 100}`;
}

function makeProduct(
  partial: Partial<PublicProduct> & { prices?: number[]; variantMedia?: PublicProduct['variants'][number]['media'][] },
): PublicProduct {
  return {
    id: 'product-id',
    slug: 'producto',
    name: 'Producto',
    media: partial.media ?? [],
    variants: (partial.prices ?? [1500000]).map((price, index) => ({
      id: `variant-${index}`,
      sku: `SKU-${index}`,
      name: `Variante ${index}`,
      color: null,
      size: null,
      priceInCents: price,
      availableStock: 1,
      media: partial.variantMedia?.[index],
    })),
  };
}
