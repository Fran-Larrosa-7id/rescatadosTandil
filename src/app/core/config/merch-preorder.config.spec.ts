import {
  canReserveMerch,
  getPreorderStatusMeta,
  MerchPreorderConfig
} from './merch-preorder.config';

describe('merch preorder config', () => {
  const baseConfig: MerchPreorderConfig = {
    status: 'coming-soon',
    opensAt: null,
    closesAt: null,
    nextOpeningAt: null,
    contactUrl: null,
    deliveryNote: null
  };

  it('provides copy for every preorder state', () => {
    expect(getPreorderStatusMeta('coming-soon').label).toBe('Próxima preventa');
    expect(getPreorderStatusMeta('open').label).toBe('Preventa abierta');
    expect(getPreorderStatusMeta('closed').label).toBe('Preventa finalizada');
  });

  it('only enables reservations when the preorder is open and has a contact URL', () => {
    expect(canReserveMerch(baseConfig)).toBe(false);
    expect(canReserveMerch({ ...baseConfig, status: 'open' })).toBe(false);
    expect(canReserveMerch({ ...baseConfig, status: 'open', contactUrl: 'https://example.com' })).toBe(true);
  });
});
