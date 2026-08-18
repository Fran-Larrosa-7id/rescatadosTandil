import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ADMIN_API_BASE_URL } from './admin-api.config';
import {
  AuditLog,
  Dashboard,
  InventoryItem,
  OrderRow,
  Page,
  Payment,
  Product,
  ProductMedia,
  Variant,
} from './admin.models';

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  constructor(private readonly http: HttpClient) {}
  private params(values: Record<string, unknown>) {
    let params = new HttpParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined)
        params = params.set(key, String(value));
    });
    return { params };
  }
  dashboard() {
    return this.http.get<Dashboard>(`${ADMIN_API_BASE_URL}/dashboard`);
  }
  products(query: Record<string, unknown> = {}) {
    return this.http.get<Page<Product>>(`${ADMIN_API_BASE_URL}/products`, this.params(query));
  }
  product(id: string) {
    return this.http.get<Product>(`${ADMIN_API_BASE_URL}/products/${id}`);
  }
  createProduct(body: Partial<Product>) {
    return this.http.post<Product>(`${ADMIN_API_BASE_URL}/products`, body);
  }
  updateProduct(id: string, body: Partial<Product>) {
    return this.http.patch<Product>(`${ADMIN_API_BASE_URL}/products/${id}`, body);
  }
  createVariant(productId: string, body: Partial<Variant>) {
    return this.http.post<Variant>(`${ADMIN_API_BASE_URL}/products/${productId}/variants`, body);
  }
  updateVariant(id: string, body: Partial<Variant>) {
    return this.http.patch<Variant>(`${ADMIN_API_BASE_URL}/variants/${id}`, body);
  }
  createMedia(productId: string, body: Partial<ProductMedia>) {
    return this.http.post<ProductMedia>(`${ADMIN_API_BASE_URL}/products/${productId}/media`, body);
  }
  updateMedia(id: string, body: Partial<ProductMedia>) {
    return this.http.patch<ProductMedia>(`${ADMIN_API_BASE_URL}/product-media/${id}`, body);
  }
  deleteMedia(id: string) {
    return this.http.delete(`${ADMIN_API_BASE_URL}/product-media/${id}`);
  }
  inventory(query: Record<string, unknown> = {}) {
    return this.http.get<Page<InventoryItem>>(
      `${ADMIN_API_BASE_URL}/inventory`,
      this.params(query),
    );
  }
  restock(id: string, quantity: number, reason: string) {
    return this.http.post(`${ADMIN_API_BASE_URL}/inventory/${id}/restock`, { quantity, reason });
  }
  adjust(id: string, stockOnHand: number, reason: string) {
    return this.http.post(`${ADMIN_API_BASE_URL}/inventory/${id}/adjust`, { stockOnHand, reason });
  }
  movements(id: string, query: Record<string, unknown> = {}) {
    return this.http.get<Page<Record<string, unknown>>>(
      `${ADMIN_API_BASE_URL}/inventory/${id}/movements`,
      this.params(query),
    );
  }
  orders(query: Record<string, unknown> = {}) {
    return this.http.get<Page<OrderRow>>(`${ADMIN_API_BASE_URL}/orders`, this.params(query));
  }
  order(id: string) {
    return this.http.get<Record<string, unknown>>(`${ADMIN_API_BASE_URL}/orders/${id}`);
  }
  payments(query: Record<string, unknown> = {}) {
    return this.http.get<Page<Payment>>(`${ADMIN_API_BASE_URL}/payments`, this.params(query));
  }
  payment(id: string) {
    return this.http.get<Payment>(`${ADMIN_API_BASE_URL}/payments/${id}`);
  }
  review() {
    return this.http.get<Page<Payment>>(`${ADMIN_API_BASE_URL}/payments/review`);
  }
  resolveReview(id: string, resolution: string, note: string) {
    return this.http.post(`${ADMIN_API_BASE_URL}/payments/${id}/review/resolve`, {
      resolution,
      note,
    });
  }
  refund(id: string, reason: string, key: string) {
    return this.http.post(
      `${ADMIN_API_BASE_URL}/payments/${id}/refund`,
      { reason, confirmation: 'REEMBOLSAR' },
      { headers: { 'Idempotency-Key': key } },
    );
  }
  audit(query: Record<string, unknown> = {}) {
    return this.http.get<Page<AuditLog>>(`${ADMIN_API_BASE_URL}/audit`, this.params(query));
  }
}
