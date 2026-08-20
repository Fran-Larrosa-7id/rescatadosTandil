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

  it('shows an exact price for one sellable variant or equal variant prices', () => {
    expect(productPriceLabel(makeProduct({ prices: [1500000] }), money)).toBe('$15000');
    expect(productPriceLabel(makeProduct({ prices: [1500000, 1500000] }), money)).toBe('$15000');
  });

  it('shows Desde the lowest sellable price when variant prices differ, regardless of their order', () => {
    expect(productPriceLabel(makeProduct({ prices: [2500000, 1500000, 2000000] }), money)).toBe('Desde $15000');
    expect(productPriceLabel(makeProduct({ prices: [1500000, 2500000, 2000000] }), money)).toBe('Desde $15000');
  });

  it('ignores out-of-stock or invalid variant prices and never invents a zero price', () => {
    expect(productPriceLabel(makeProduct({ prices: [0, 1500000], stocks: [4, 0] }), money)).toBe('Sin precio');
    expect(productPriceLabel(makeProduct({ prices: [2500000, 1500000], stocks: [0, 3] }), money)).toBe('$15000');
  });
});

function money(value: number): string {
  return `$${value / 100}`;
}

function makeProduct(
  partial: Partial<PublicProduct> & {
    prices?: number[];
    stocks?: number[];
    variantMedia?: PublicProduct['variants'][number]['media'][];
  },
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
      availableStock: partial.stocks?.[index] ?? 1,
      media: partial.variantMedia?.[index],
    })),
  };
}
