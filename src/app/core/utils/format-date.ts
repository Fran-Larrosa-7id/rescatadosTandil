const shortMonthFormatter = new Intl.DateTimeFormat('es-AR', {
  month: 'short',
  timeZone: 'UTC'
});

export function formatDateNumeric(value: string): string {
  const date = new Date(`${value}T00:00:00.000Z`);

  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(date);
}

export function formatDateDayMonth(value: string): string {
  const date = new Date(`${value}T00:00:00.000Z`);
  const day = new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    timeZone: 'UTC'
  }).format(date);
  const month = shortMonthFormatter.format(date).replace('.', '').toUpperCase();

  return `${day} ${month}`;
}
