import { PublicProduct, PublicProductMedia, PublicProductVariant } from './commerce.models';

export function selectCoverMedia(product: PublicProduct): PublicProductMedia | null {
  const general = selectCoverFromMedia(product.media);
  if (general) return general;
  const variantMedia = product.variants
    .filter((variant) => variant.availableStock > 0)
    .flatMap((variant) => sortedMedia(variant.media ?? []));
  return variantMedia.find((item) => item.isCover) ?? variantMedia[0] ?? null;
}

export function galleryForVariant(
  product: PublicProduct,
  variant: PublicProductVariant | null,
): PublicProductMedia[] {
  const specific = sortedMedia(variant?.media ?? []);
  if (specific.length) return specific;
  return sortedMedia(product.media);
}

export function selectGalleryCover(media: PublicProductMedia[]): PublicProductMedia | null {
  const sorted = sortedMedia(media);
  return sorted.find((item) => item.isCover) ?? sorted[0] ?? null;
}

export function selectVariantDisplayMedia(
  product: PublicProduct,
  variant: PublicProductVariant,
): PublicProductMedia | null {
  return selectGalleryCover(galleryForVariant(product, variant));
}

function selectCoverFromMedia(media: PublicProductMedia[]): PublicProductMedia | null {
  return selectGalleryCover(media);
}

function sortedMedia(media: PublicProductMedia[]): PublicProductMedia[] {
  return [...media].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function activeVariants(product: PublicProduct) {
  return product.variants.filter((variant) => variant.availableStock > 0);
}

export function productPriceLabel(product: PublicProduct, formatter: (value: number) => string): string {
  const variants = product.variants;
  if (!variants.length) return 'Sin precio';
  const prices = variants.map((variant) => variant.priceInCents);
  const min = Math.min(...prices);
  return formatter(min);
}
