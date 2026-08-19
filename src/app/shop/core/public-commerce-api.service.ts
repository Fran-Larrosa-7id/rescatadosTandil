import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MercadoPagoPreferenceResponse,
  PUBLIC_API_BASE_URL,
  PublicOrderStatusResponse,
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
    return this.http.get<PublicOrderStatusResponse>(`${PUBLIC_API_BASE_URL}/orders/${orderId}/status`);
  }
}
