import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AdminApiService } from './admin-api.service';
import { ADMIN_API_BASE_URL } from './admin-api.config';
import { adminErrorMessage } from './admin-domain-error';

describe('AdminApiService contracts', () => {
  let api: AdminApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    api = TestBed.inject(AdminApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('uses the real product creation body and flat product list pagination', () => {
    api.products({ active: true, page: 2, pageSize: 10 }).subscribe((response) => {
      expect(response.page).toBe(2);
      expect(response.total).toBe(1);
      expect(response.items[0].variants).toEqual([]);
    });
    const request = http.expectOne(`${ADMIN_API_BASE_URL}/products?active=true&page=2&pageSize=10`);
    expect(request.request.method).toBe('GET');
    request.flush({ items: [{ id: 'product-id', name: 'Bolsa', slug: 'bolsa', shortDescription: null, featured: false, sortOrder: 0, active: true, createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z', variants: [], media: [] }], page: 2, pageSize: 10, total: 1 });
  });

  it('posts restock and adjusts to a target stockOnHand', () => {
    api.restock('variant-id', 3, 'Ingreso').subscribe();
    const restock = http.expectOne(`${ADMIN_API_BASE_URL}/inventory/variant-id/restock`);
    expect(restock.request.body).toEqual({ quantity: 3, reason: 'Ingreso' });
    restock.flush({ id: 'inventory-id', variantId: 'variant-id', stockOnHand: 8, reservedStock: 1, createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' });

    api.adjust('variant-id', 6, 'Recuento').subscribe();
    const adjust = http.expectOne(`${ADMIN_API_BASE_URL}/inventory/variant-id/adjust`);
    expect(adjust.request.body).toEqual({ stockOnHand: 6, reason: 'Recuento' });
    adjust.flush({ id: 'inventory-id', variantId: 'variant-id', stockOnHand: 6, reservedStock: 1, createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' });
  });

  it('keeps the six order statuses and the backend itemsCount read model', () => {
    const statuses = ['AWAITING_PAYMENT', 'PAYMENT_PENDING', 'PAID', 'EXPIRED', 'CANCELLED', 'REFUNDED'];
    api.orders().subscribe((response) => {
      expect(response.items.map((item) => item.status)).toEqual(statuses);
      expect(response.items[0].itemsCount).toBe(4);
    });
    const request = http.expectOne(`${ADMIN_API_BASE_URL}/orders`);
    request.flush({ items: statuses.map((status, index) => ({ id: `order-${index}`, status, totalInCents: 1000, itemsCount: index === 0 ? 4 : 1, createdAt: '2026-01-01T00:00:00Z', reservationExpiresAt: '2026-01-01T01:00:00Z', paidAt: null })), pagination: { page: 1, pageSize: 20, totalItems: 6, totalPages: 1 } });
  });

  it('uses the local payment UUID for detail and keeps providerPaymentId as data', () => {
    api.payment('local-payment-uuid').subscribe((response) => {
      expect(response.payment.id).toBe('local-payment-uuid');
      expect(response.payment.providerPaymentId).toBe('mp-123');
    });
    const request = http.expectOne(`${ADMIN_API_BASE_URL}/payments/local-payment-uuid`);
    expect(request.request.method).toBe('GET');
    request.flush({ payment: { id: 'local-payment-uuid', providerPaymentId: 'mp-123', orderId: 'order-uuid', providerStatus: 'approved', providerStatusDetail: null, processingStatus: 'APPLIED', transactionAmountInCents: 8000, currencyId: 'ARS', dateApproved: null, createdAt: '2026-01-01T00:00:00Z', reviewReason: null, reviewResolvedAt: null, reviewResolution: null, reviewResolvedByAdminId: null, reviewNote: null }, order: null, refund: null });
  });

  it('posts the allowed review resolution and forwards the refund idempotency key once', () => {
    api.resolveReview('local-payment-uuid', { resolution: 'ACKNOWLEDGED_NO_ACTION', note: 'Verificado' }).subscribe();
    const review = http.expectOne(`${ADMIN_API_BASE_URL}/payments/local-payment-uuid/review/resolve`);
    expect(review.request.body).toEqual({ resolution: 'ACKNOWLEDGED_NO_ACTION', note: 'Verificado' });
    review.flush({});

    api.refund('local-payment-uuid', { reason: 'Solicitud', confirmation: 'REEMBOLSAR' }, 'uuid-key').subscribe();
    const refund = http.expectOne(`${ADMIN_API_BASE_URL}/payments/local-payment-uuid/refund`);
    expect(refund.request.headers.get('Idempotency-Key')).toBe('uuid-key');
    expect(refund.request.body).toEqual({ reason: 'Solicitud', confirmation: 'REEMBOLSAR' });
    refund.flush({ id: 'refund-id' });
  });

  it('maps documented domain errors and leaves unknown errors generic', () => {
    expect(adminErrorMessage(new HttpErrorResponse({ error: { code: 'PAYMENT_REVIEW_NOT_ALLOWED' }, status: 409 }), 'Fallback')).toBe('Este pago no admite esa resolución de review.');
    expect(adminErrorMessage(new HttpErrorResponse({ error: { code: 'NOT_A_DOMAIN_ERROR' }, status: 400 }), 'Fallback')).toBe('Fallback');
  });

  it('accepts audit entries without an admin user and normalized pagination', () => {
    api.audit({ sort: 'createdAt:asc' }).subscribe((response) => {
      expect(response.items[0].adminUser).toBeNull();
      expect(response.pagination.totalPages).toBe(1);
    });
    const request = http.expectOne(`${ADMIN_API_BASE_URL}/audit?sort=createdAt:asc`);
    request.flush({ items: [{ id: 'audit-id', createdAt: '2026-01-01T00:00:00Z', action: 'SYSTEM_JOB', adminUser: null, entityType: null, entityId: null, metadata: null }], pagination: { page: 1, pageSize: 20, totalItems: 1, totalPages: 1 } });
  });

  it('reads the real dashboard counters without a provisional revenue field', () => {
    api.dashboard().subscribe((dashboard) => {
      expect(dashboard.inventory.reservedUnits).toBe(3);
      expect('revenue' in dashboard).toBe(false);
    });
    const request = http.expectOne(`${ADMIN_API_BASE_URL}/dashboard`);
    request.flush({ products: { active: 2, inactive: 1 }, inventory: { lowStockVariants: 1, outOfStockVariants: 0, reservedUnits: 3 }, orders: { awaitingPayment: 1, paymentPending: 1, paidToday: 2, expiredToday: 0 }, payments: { openReviews: 1 } });
  });

  it('maps an actual 409 response through the central error helper', () => {
    let message = '';
    api.adjust('variant-id', 0, 'Recuento').subscribe({ error: (error) => (message = adminErrorMessage(error, 'Fallback')) });
    const request = http.expectOne(`${ADMIN_API_BASE_URL}/inventory/variant-id/adjust`);
    request.flush({ code: 'STOCK_ADJUSTMENT_CONFLICT' }, { status: 409, statusText: 'Conflict' });
    expect(message).toBe('El stock en mano no puede quedar por debajo del reservado.');
  });
});
