export type MerchPreorderStatus = 'coming-soon' | 'open' | 'closed';

export interface MerchPreorderConfig {
  readonly status: MerchPreorderStatus;
  readonly opensAt: string | null;
  readonly closesAt: string | null;
  readonly nextOpeningAt: string | null;
  readonly contactUrl: string | null;
  readonly deliveryNote: string | null;
}

export const PREORDER_STATUS_META = {
  'coming-soon': {
    label: 'Próxima preventa',
    title: 'Muy pronto abrimos una nueva preventa.',
    description:
      'Trabajamos por preventa para producir de forma organizada y evitar stock innecesario. Cuando abramos una nueva fecha, vas a poder reservar tus productos Gatarsis.',
    ctaLabel: 'Consultar preventa'
  },
  open: {
    label: 'Preventa abierta',
    title: 'Ya podés reservar tu Gatarsis.',
    description: 'Elegí tu producto y escribinos para reservarlo.',
    ctaLabel: 'Quiero reservar'
  },
  closed: {
    label: 'Preventa finalizada',
    title: 'Esta preventa ya cerró.',
    description: 'Estamos preparando los pedidos y pronto anunciaremos una nueva fecha.',
    ctaLabel: 'Consultar preventa'
  }
} as const;

export const MERCH_PREORDER_CONFIG: MerchPreorderConfig = {
  status: 'coming-soon',
  opensAt: null,
  closesAt: null,
  nextOpeningAt: null,
  contactUrl: null,
  deliveryNote: null
};

export function getPreorderStatusMeta(status: MerchPreorderStatus) {
  return PREORDER_STATUS_META[status];
}

export function canReserveMerch(config: MerchPreorderConfig): boolean {
  return config.status === 'open' && config.contactUrl !== null;
}
