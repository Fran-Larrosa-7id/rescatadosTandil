import { PublicProductVariant, VariantAttributes } from './commerce.models';

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

const ATTRIBUTE_LABELS: Readonly<Record<string, string>> = {
  color: 'Color',
  size: 'Talle',
};

export function variantColor(variant: PublicProductVariant): string | null {
  return colorSwatch(variantAttribute(variant, 'color'));
}

export function publicVariantLabel(variant: PublicProductVariant): string {
  if (!hasExplicitAttributes(variant)) return variant.name;
  const color = variantAttribute(variant, 'color');
  const size = variantAttribute(variant, 'size');
  if (color && size) return color + ' · Talle ' + size;
  return color ?? size ?? variant.name;
}

export function variantAttribute(variant: PublicProductVariant, key: string): string | null {
  const value = effectiveAttributes(variant)[key];
  const normalized = value?.trim();
  return normalized || null;
}

export function hasStructuredAttributes(variant: PublicProductVariant): boolean {
  return Object.keys(effectiveAttributes(variant)).length > 0;
}

export function attributeLabel(key: string): string {
  return ATTRIBUTE_LABELS[key] ?? key;
}

export function attributeKeys(variants: PublicProductVariant[]): string[] {
  const keys = new Set<string>();
  variants.forEach((variant) =>
    Object.entries(effectiveAttributes(variant)).forEach(([key, value]) => {
      if (value.trim()) keys.add(key);
    }),
  );
  const priority = ['color', 'size'];
  return [...keys].sort(
    (left, right) =>
      (priority.indexOf(left) + 1 || 99) - (priority.indexOf(right) + 1 || 99) ||
      left.localeCompare(right),
  );
}

export function attributesForVariant(variant: PublicProductVariant): VariantAttributes {
  return effectiveAttributes(variant);
}

export function colorSwatch(color: string | null): string | null {
  const normalized = color?.trim().toLowerCase();
  return normalized ? (VARIANT_COLOR_MAP[normalized] ?? null) : null;
}

export function isValidAttributeValue(key: string, value: string | null): boolean {
  return !!value && (key !== 'size' || !/[,/]/.test(value));
}

function effectiveAttributes(variant: PublicProductVariant): VariantAttributes {
  return {
    ...(variant.color ? { color: variant.color } : {}),
    ...(variant.size ? { size: variant.size } : {}),
    ...(variant.attributes ?? {}),
  };
}

function hasExplicitAttributes(variant: PublicProductVariant): boolean {
  return Object.values(variant.attributes ?? {}).some((value) => value.trim().length > 0);
}
