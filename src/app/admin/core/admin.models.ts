export interface AdminUser {
  id: string;
  email: string;
  role: 'ADMIN';
}
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  admin: AdminUser;
}
export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
export interface Page<T> {
  items: T[];
  pagination: Pagination;
}
export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  featured: boolean;
  sortOrder: number;
  active: boolean;
  updatedAt: string;
  variants?: Variant[];
  media?: ProductMedia[];
}
export interface Variant {
  id: string;
  productId?: string;
  sku: string;
  name: string;
  color?: string | null;
  size?: string | null;
  priceInCents: number;
  active: boolean;
  sortOrder?: number;
  lowStockThreshold?: number;
  stockOnHand?: number;
  reservedStock?: number;
  availableStock?: number;
}
export interface ProductMedia {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
  isCover: boolean;
}
export interface InventoryItem {
  variantId: string;
  productName: string;
  variantName: string;
  sku: string;
  stockOnHand: number;
  reservedStock: number;
  availableStock: number;
  lowStockThreshold: number;
  active: boolean;
}
export interface OrderRow {
  id: string;
  status: string;
  totalInCents: number;
  itemsCount: number;
  createdAt: string;
  paidAt?: string | null;
  reservationExpiresAt?: string | null;
}
export interface Payment {
  id: string;
  providerPaymentId?: string | null;
  orderId: string;
  providerStatus: string;
  providerStatusDetail?: string | null;
  processingStatus: string;
  transactionAmountInCents: number;
  currencyId: string;
  dateApproved?: string | null;
  reviewReason?: string | null;
  reviewNote?: string | null;
}
export interface AuditLog {
  id: string;
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
  adminUser?: AdminUser | null;
}
export interface Dashboard {
  products: { active: number; inactive: number };
  inventory: { lowStockVariants: number; outOfStockVariants: number; reservedUnits: number };
  orders: {
    awaitingPayment: number;
    paymentPending: number;
    paidToday: number;
    expiredToday: number;
  };
  payments: { openReviews: number };
}
