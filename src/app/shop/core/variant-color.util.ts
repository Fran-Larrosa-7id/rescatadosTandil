import { PublicProductVariant } from './commerce.models';

const VARIANT_COLOR_MAP: Record<string, string> = {
  blanco: '#f6f2ed',
  white: '#f6f2ed',
  negro: '#161616',
  black: '#161616',
  lila: '#a56bdc',
  lilac: '#a56bdc',
  violeta: '#725a9c',
  purple: '#725a9c',
  rosa: '#e58a9e',
  pink: '#e58a9e',
};

export function variantColor(variant: PublicProductVariant): string | null {
  const color = variant.color?.trim().toLowerCase();
  return color ? (VARIANT_COLOR_MAP[color] ?? null) : null;
}

export function publicVariantLabel(variant: PublicProductVariant): string {
  return [variant.color || variant.name, variant.size].filter(Boolean).join(' · ') || variant.name;
}
