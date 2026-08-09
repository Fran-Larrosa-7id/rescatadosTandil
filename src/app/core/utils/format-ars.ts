const arsFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export function formatArs(value: number): string {
  return arsFormatter.format(value).replace(/\s/g, '');
}
