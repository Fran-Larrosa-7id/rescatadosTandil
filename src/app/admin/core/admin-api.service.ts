import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN_API_BASE_URL } from './admin-api.config';
import {
  AdminAuditLog,
  AdminAuditQuery,
  AdminDashboard,
  AdminFlatPage,
  AdminInventoryItem,
  AdminInventoryListQuery,
  AdminInventoryMovement,
  AdminInventoryMovementsQuery,
  AdminInventoryMutationResponse,
  AdminOrderDetail,
  AdminOrderListItem,
  AdminOrderListQuery,
  AdminPaginatedResponse,
  AdminPaymentDetailResponse,
  AdminPaymentListItem,
  AdminPaymentListQuery,
  AdminProductDetail,
  AdminProductListItem,
  AdminProductListQuery,
  AdminProductMedia,
  AdminProductVariant,
  CreateAdminProductMediaRequest,
  CreateAdminProductRequest,
  CreateAdminRefundRequest,
  CreateAdminVariantRequest,
  ResolveAdminPaymentReviewRequest,
  UpdateAdminProductMediaRequest,
  UpdateAdminProductRequest,
  UpdateAdminFulfillmentRequest,
  UpdateAdminFulfillmentResponse,
  UpdateAdminVariantRequest,
} from './admin.models';

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  constructor(private readonly http: HttpClient) {}

  private options(query: object = {}): { params: HttpParams } {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== '') params = params.set(key, String(value));
    }
    return { params };
  }

  dashboard(): Observable<AdminDashboard> {
    return this.http.get<AdminDashboard>(`${ADMIN_API_BASE_URL}/dashboard`);
  }

  products(query: AdminProductListQuery = {}): Observable<AdminFlatPage<AdminProductListItem>> {
    return this.http.get<AdminFlatPage<AdminProductListItem>>(
      `${ADMIN_API_BASE_URL}/products`,
      this.options(query),
    );
  }

  product(productId: string): Observable<AdminProductDetail> {
    return this.http.get<AdminProductDetail>(`${ADMIN_API_BASE_URL}/products/${productId}`);
  }

  createProduct(body: CreateAdminProductRequest): Observable<AdminProductDetail> {
    return this.http.post<AdminProductDetail>(`${ADMIN_API_BASE_URL}/products`, body);
  }

  updateProduct(productId: string, body: UpdateAdminProductRequest): Observable<AdminProductDetail> {
    return this.http.patch<AdminProductDetail>(`${ADMIN_API_BASE_URL}/products/${productId}`, body);
  }

  createVariant(productId: string, body: CreateAdminVariantRequest): Observable<AdminProductVariant> {
    return this.http.post<AdminProductVariant>(
      `${ADMIN_API_BASE_URL}/products/${productId}/variants`,
      body,
    );
  }

  variant(variantId: string): Observable<AdminProductVariant> {
    return this.http.get<AdminProductVariant>(`${ADMIN_API_BASE_URL}/variants/${variantId}`);
  }

  updateVariant(variantId: string, body: UpdateAdminVariantRequest): Observable<AdminProductVariant> {
    return this.http.patch<AdminProductVariant>(`${ADMIN_API_BASE_URL}/variants/${variantId}`, body);
  }

  createMedia(productId: string, body: CreateAdminProductMediaRequest): Observable<AdminProductMedia> {
    return this.http.post<AdminProductMedia>(`${ADMIN_API_BASE_URL}/products/${productId}/media`, body);
  }

  updateMedia(mediaId: string, body: UpdateAdminProductMediaRequest): Observable<AdminProductMedia> {
    return this.http.patch<AdminProductMedia>(`${ADMIN_API_BASE_URL}/product-media/${mediaId}`, body);
  }

  deleteMedia(mediaId: string): Observable<void> {
    return this.http.delete<void>(`${ADMIN_API_BASE_URL}/product-media/${mediaId}`);
  }

  inventory(query: AdminInventoryListQuery = {}): Observable<AdminFlatPage<AdminInventoryItem>> {
    return this.http.get<AdminFlatPage<AdminInventoryItem>>(
      `${ADMIN_API_BASE_URL}/inventory`,
      this.options(query),
    );
  }

  restock(variantId: string, quantity: number, reason: string): Observable<AdminInventoryMutationResponse> {
    return this.http.post<AdminInventoryMutationResponse>(
      `${ADMIN_API_BASE_URL}/inventory/${variantId}/restock`,
      { quantity, reason },
    );
  }

  adjust(
    variantId: string,
    stockOnHand: number,
    reason: string,
  ): Observable<AdminInventoryMutationResponse> {
    return this.http.post<AdminInventoryMutationResponse>(
      `${ADMIN_API_BASE_URL}/inventory/${variantId}/adjust`,
      { stockOnHand, reason },
    );
  }

  movements(
    variantId: string,
    query: AdminInventoryMovementsQuery = {},
  ): Observable<AdminFlatPage<AdminInventoryMovement>> {
    return this.http.get<AdminFlatPage<AdminInventoryMovement>>(
      `${ADMIN_API_BASE_URL}/inventory/${variantId}/movements`,
      this.options(query),
    );
  }

  orders(query: AdminOrderListQuery = {}): Observable<AdminPaginatedResponse<AdminOrderListItem>> {
    return this.http.get<AdminPaginatedResponse<AdminOrderListItem>>(
      `${ADMIN_API_BASE_URL}/orders`,
      this.options(query),
    );
  }

  order(orderId: string): Observable<AdminOrderDetail> {
    return this.http.get<AdminOrderDetail>(`${ADMIN_API_BASE_URL}/orders/${orderId}`);
  }

  updateFulfillment(
    orderId: string,
    body: UpdateAdminFulfillmentRequest,
  ): Observable<UpdateAdminFulfillmentResponse> {
    return this.http.patch<UpdateAdminFulfillmentResponse>(
      `${ADMIN_API_BASE_URL}/orders/${orderId}/fulfillment`,
      body,
    );
  }

  payments(query: AdminPaymentListQuery = {}): Observable<AdminPaginatedResponse<AdminPaymentListItem>> {
    return this.http.get<AdminPaginatedResponse<AdminPaymentListItem>>(
      `${ADMIN_API_BASE_URL}/payments`,
      this.options(query),
    );
  }

  payment(paymentId: string): Observable<AdminPaymentDetailResponse> {
    return this.http.get<AdminPaymentDetailResponse>(`${ADMIN_API_BASE_URL}/payments/${paymentId}`);
  }

  review(query: Pick<AdminPaymentListQuery, 'page' | 'pageSize' | 'dateFrom' | 'dateTo'> = {}) {
    return this.http.get<AdminPaginatedResponse<AdminPaymentListItem>>(
      `${ADMIN_API_BASE_URL}/payments/review`,
      this.options(query),
    );
  }

  resolveReview(
    paymentId: string,
    body: ResolveAdminPaymentReviewRequest,
  ): Observable<AdminPaymentListItem> {
    return this.http.post<AdminPaymentListItem>(
      `${ADMIN_API_BASE_URL}/payments/${paymentId}/review/resolve`,
      body,
    );
  }

  refund(paymentId: string, body: CreateAdminRefundRequest, idempotencyKey: string) {
    return this.http.post(`${ADMIN_API_BASE_URL}/payments/${paymentId}/refund`, body, {
      headers: { 'Idempotency-Key': idempotencyKey },
    });
  }

  audit(query: AdminAuditQuery = {}): Observable<AdminPaginatedResponse<AdminAuditLog>> {
    return this.http.get<AdminPaginatedResponse<AdminAuditLog>>(
      `${ADMIN_API_BASE_URL}/audit`,
      this.options(query),
    );
  }
}
