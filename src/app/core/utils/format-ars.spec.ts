import { formatArs } from './format-ars';

describe('formatArs', () => {
  it('formats Argentine pesos without decimals', () => {
    expect(formatArs(1_950_800)).toBe('$1.950.800');
  });
});
