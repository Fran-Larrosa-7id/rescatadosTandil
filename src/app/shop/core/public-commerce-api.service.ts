import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  MercadoPagoPreferenceResponse,
  PUBLIC_API_BASE_URL,
  PublicOrderStatusResponse,
  PublicOrderStatus,
  PublicOrderStatusHttp,
  PublicOrderStatusHttpResponse,
  PublicProduct,
  ReserveCheckoutRequest,
  ReserveCheckoutResponse,
} from './commerce.models';

@Injectable({ providedIn: 'root' })
export class PublicCommerceApiService {
  constructor(private readonly http: HttpClient) {}

  products(): Observable<PublicProduct[]> {
    return this.http.get<PublicProduct[]>(`${PUBLIC_API_BASE_URL}/products`);
  }

  reserve(body: ReserveCheckoutRequest, idempotencyKey: string): Observable<ReserveCheckoutResponse> {
    return this.http.post<ReserveCheckoutResponse>(`${PUBLIC_API_BASE_URL}/checkout/reserve`, body, {
      headers: { 'Idempotency-Key': idempotencyKey },
    });
  }

  createMercadoPagoPreference(orderId: string): Observable<MercadoPagoPreferenceResponse> {
    return this.http.post<MercadoPagoPreferenceResponse>(
      `${PUBLIC_API_BASE_URL}/checkout/${orderId}/mercado-pago/preference`,
      {},
    );
  }

  orderStatus(orderId: string): Observable<PublicOrderStatusResponse> {
    return this.http
      .get<PublicOrderStatusHttpResponse>(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`)
      .pipe(map((response) => ({ ...response, status: normalizeOrderStatus(response.status) })));
  }
}

function normalizeOrderStatus(status: PublicOrderStatusHttp): PublicOrderStatus {
  const statuses: Record<PublicOrderStatusHttp, PublicOrderStatus> = {
    awaiting_payment: 'AWAITING_PAYMENT',
    payment_pending: 'PAYMENT_PENDING',
    paid: 'PAID',
    expired: 'EXPIRED',
    cancelled: 'CANCELLED',
    refunded: 'REFUNDED',
  };
  return statuses[status];
}
