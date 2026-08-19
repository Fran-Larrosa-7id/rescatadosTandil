export const PUBLIC_API_BASE_URL = 'https://gatarsis-back.onrender.com/api/v1';

export interface PublicProductMedia {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
  isCover: boolean;
}

export interface PublicProductVariant {
  id: string;
  sku: string;
  name: string;
  color: string | null;
  size: string | null;
  priceInCents: number;
  availableStock: number;
}

export interface PublicProduct {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string | null;
  media: PublicProductMedia[];
  variants: PublicProductVariant[];
}

export interface ReserveCheckoutRequest {
  items: Array<{ variantId: string; quantity: number }>;
}

export type PublicOrderStatus =
  | 'AWAITING_PAYMENT'
  | 'PAYMENT_PENDING'
  | 'PAID'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface ReservedOrderItem {
  variantId: string;
  quantity: number;
  unitPriceInCents?: number;
  lineTotalInCents?: number;
  productNameSnapshot?: string;
  variantNameSnapshot?: string;
  skuSnapshot?: string;
}

export interface ReserveCheckoutResponse {
  orderId: string;
  status: PublicOrderStatus;
  totalInCents: number;
  reservationExpiresAt: string;
  items?: ReservedOrderItem[];
}

export interface MercadoPagoPreferenceResponse {
  orderId: string;
  preferenceId: string;
  initPoint: string;
  reservationExpiresAt?: string;
}

export interface PublicOrderStatusResponse {
  orderId: string;
  status: PublicOrderStatus;
  totalInCents?: number;
  reservationExpiresAt?: string | null;
  paidAt?: string | null;
}
