import { formatArs } from './format-ars';

describe('formatArs', () => {
  it('formats Argentine pesos with two decimals', () => {
    expect(formatArs(1_950_800.84)).toBe('$1.950.800,84');
  });
});
