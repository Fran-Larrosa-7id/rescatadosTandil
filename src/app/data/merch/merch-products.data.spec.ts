import { MERCH_PRODUCTS } from './merch-products.data';

describe('MERCH_PRODUCTS', () => {
  it('has unique product slugs', () => {
    const slugs = MERCH_PRODUCTS.map((product) => product.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('does not expose a price when it has not been defined', () => {
    expect(MERCH_PRODUCTS.every((product) => product.price === null)).toBe(true);
  });
});
