import { PublicProduct } from './commerce.models';
import { productPriceLabel, selectCoverMedia } from './product-media.util';

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

  it('shows exact price or Desde without averaging variants', () => {
    expect(productPriceLabel(makeProduct({ prices: [1500000, 1500000] }), money)).toBe('$15000');
    expect(productPriceLabel(makeProduct({ prices: [2500000, 1500000] }), money)).toBe('Desde $15000');
  });
});

function money(value: number): string {
  return `$${value / 100}`;
}

function makeProduct(partial: Partial<PublicProduct> & { prices?: number[] }): PublicProduct {
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
    })),
  };
}
