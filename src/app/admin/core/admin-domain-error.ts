import { HttpErrorResponse } from '@angular/common/http';

export type AdminDomainErrorCode =
  | 'PRODUCT_SLUG_CONFLICT'
  | 'SKU_ALREADY_EXISTS'
  | 'STOCK_ADJUSTMENT_CONFLICT'
  | 'PAYMENT_REVIEW_NOT_ALLOWED'
  | 'PAYMENT_NOT_REFUNDABLE'
  | 'IDEMPOTENCY_CONFLICT'
  | 'PAYMENT_NOT_FOUND'
  | 'INVALID_DATE_RANGE'
  | 'ORDER_NOT_PAID'
  | 'INVALID_FULFILLMENT_TRANSITION'
  | 'FULFILLMENT_NOT_ALLOWED'
  | 'FULFILLMENT_NOT_FOUND';

interface DomainErrorBody {
  code?: string;
}

const messages: Record<AdminDomainErrorCode, string> = {
  PRODUCT_SLUG_CONFLICT: 'Ya existe un producto con ese slug.',
  SKU_ALREADY_EXISTS: 'Ya existe una variante con ese SKU.',
  STOCK_ADJUSTMENT_CONFLICT: 'El stock en mano no puede quedar por debajo del reservado.',
  PAYMENT_REVIEW_NOT_ALLOWED: 'Este pago no admite esa resolución de review.',
  PAYMENT_NOT_REFUNDABLE: 'Este pago no puede reembolsarse.',
  IDEMPOTENCY_CONFLICT: 'La operación ya fue solicitada con una clave de idempotencia diferente.',
  PAYMENT_NOT_FOUND: 'No encontramos el pago solicitado.',
  INVALID_DATE_RANGE: 'La fecha desde no puede ser posterior a la fecha hasta.',
  ORDER_NOT_PAID: 'El pedido todavía no tiene un pago confirmado.',
  INVALID_FULFILLMENT_TRANSITION: 'Este cambio de estado ya no es válido.',
  FULFILLMENT_NOT_ALLOWED: 'No se puede modificar la entrega de este pedido.',
  FULFILLMENT_NOT_FOUND: 'La entrega no está disponible para este pedido.',
};

function isDomainErrorBody(value: unknown): value is DomainErrorBody {
  return typeof value === 'object' && value !== null;
}

export function adminErrorCode(error: unknown): AdminDomainErrorCode | null {
  if (!(error instanceof HttpErrorResponse) || !isDomainErrorBody(error.error)) return null;
  const code = error.error.code;
  return code && code in messages ? (code as AdminDomainErrorCode) : null;
}

export function adminErrorMessage(error: unknown, fallback: string): string {
  const code = adminErrorCode(error);
  return code ? messages[code] : fallback;
}
