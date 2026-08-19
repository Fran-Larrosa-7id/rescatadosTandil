import { PublicProduct, PublicProductMedia } from './commerce.models';

export function selectCoverMedia(product: PublicProduct): PublicProductMedia | null {
  const sorted = [...product.media].sort((a, b) => a.sortOrder - b.sortOrder);
  return sorted.find((item) => item.isCover) ?? sorted[0] ?? null;
}

export function activeVariants(product: PublicProduct) {
  return product.variants.filter((variant) => variant.availableStock > 0);
}

export function productPriceLabel(product: PublicProduct, formatter: (value: number) => string): string {
  const variants = product.variants;
  if (!variants.length) return 'Sin precio';
  const prices = variants.map((variant) => variant.priceInCents);
  const min = Math.min(...prices);
  const allSame = prices.every((price) => price === min);
  return `${allSame ? '' : 'Desde '}${formatter(min)}`;
}
