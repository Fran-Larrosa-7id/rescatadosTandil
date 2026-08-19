import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  formatAdminDate,
  formatArsFromCents,
  paymentProcessingStatusLabel,
  providerStatusLabel,
} from '../core/admin-formatters';
import { adminErrorCode, adminErrorMessage } from '../core/admin-domain-error';
import { AdminApiService } from '../core/admin-api.service';
import {
  AdminPaymentDetailResponse,
  AdminPaymentListItem,
  AdminPaymentProcessingStatus,
} from '../core/admin.models';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `<div class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">Cobros</p>
        <h1>{{ detail() ? 'Pago' : reviewMode ? 'Pagos para revisar' : 'Pagos' }}</h1>
      </div>
    </div>
    @if (detail()) {
      <section class="surface-card detail">
        <h2>Pago</h2>
        <p>
          ID local Gatarsis: <code>{{ detail()!.payment.id }}</code>
        </p>
        <p>
          Mercado Pago Payment ID: <code>{{ detail()!.payment.providerPaymentId }}</code>
        </p>
        <p>
          Pedido: <code>{{ detail()!.payment.orderId }}</code>
        </p>
        <p>
          <span class="badge">{{ processingLabel(detail()!.payment.processingStatus) }}</span>
        </p>
        <p>Importe: {{ money(detail()!.payment.transactionAmountInCents) }}</p>
        @if (detail()!.refund) {
          <p>Reembolso: {{ detail()!.refund!.status }}</p>
        }
        <button type="button" (click)="openRefund(detail()!.payment)">Reembolsar</button>
      </section>
    } @else {
      @if (!reviewMode) {
        <div class="filters">
          <label
            >Procesamiento<select [(ngModel)]="processingStatus" (ngModelChange)="load()">
              <option value="">Todos</option>
              <option value="RECEIVED">Recibido</option>
              <option value="RECORDED">Registrado</option>
              <option value="APPLIED">Aplicado</option>
              <option value="REQUIRES_REVIEW">Requiere revisión</option>
            </select></label
          ><label>Pedido<input [(ngModel)]="orderId" (ngModelChange)="load()" /></label
          ><label>Pago MP<input [(ngModel)]="providerPaymentId" (ngModelChange)="load()" /></label>
        </div>
      }
      @if (loading()) {
        <div class="skeleton">Cargando pagos…</div>
      } @else if (error()) {
        <div class="state">
          <p>{{ message() }}</p>
          <button type="button" class="button button-primary" (click)="load()">Reintentar</button>
        </div>
      } @else if (payments().length) {
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Pago MP</th>
                <th>Pedido</th>
                <th>Estado MP</th>
                <th>Procesamiento</th>
                <th class="numeric">Importe</th>
                <th>Aprobado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (payment of payments(); track payment.id) {
                <tr>
                  <td>{{ payment.providerPaymentId }}</td>
                  <td>
                    <code>{{ payment.orderId.slice(0, 8) }}</code>
                  </td>
                  <td>{{ providerLabel(payment.providerStatus) }}</td>
                  <td>
                    <span class="badge">{{ processingLabel(payment.processingStatus) }}</span>
                  </td>
                  <td class="numeric">{{ money(payment.transactionAmountInCents) }}</td>
                  <td>{{ date(payment.dateApproved) }}</td>
                  <td>
                    <div class="table-actions">
                      <button type="button" (click)="show(payment.id)">Ver</button>
                      @if (reviewMode) {
                        <button type="button" (click)="resolve(payment)">Resolver</button>
                      }
                      <button type="button" (click)="openRefund(payment)">Reembolsar</button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      } @else {
        <div class="state">
          <p>{{ reviewMode ? 'No hay pagos para revisar.' : 'No hay pagos.' }}</p>
        </div>
      }
    }
    @if (refund()) {
      <div class="dialog-backdrop">
        <form class="dialog surface-card" (ngSubmit)="sendRefund()">
          <h2>Reembolsar pago</h2>
          <p>
            Pago MP: <strong>{{ refund()!.providerPaymentId }}</strong>
          </p>
          <p>
            Pedido: <strong>{{ refund()!.orderId.slice(0, 8) }}</strong>
          </p>
          <p>
            Importe: <strong>{{ money(refund()!.transactionAmountInCents) }}</strong>
          </p>
          <p>
            El dinero se devolverá mediante Mercado Pago.<br />El stock NO se repone
            automáticamente.
          </p>
          <label>Motivo<textarea name="reason" [(ngModel)]="reason" required></textarea></label
          ><label
            >Escribí REEMBOLSAR para confirmar<input
              name="confirmation"
              [(ngModel)]="confirmation"
              required
          /></label>
          <p class="error" aria-live="polite">{{ message() }}</p>
          <div class="actions">
            <button type="button" (click)="refund.set(null)">Cancelar</button
            ><button
              class="button-primary button"
              [disabled]="confirmation !== 'REEMBOLSAR' || !reason.trim() || busy()"
            >
              {{
                busy() ? 'Procesando…' : 'Reembolsar ' + money(refund()!.transactionAmountInCents)
              }}
            </button>
          </div>
        </form>
      </div>
    }
  </div>`,
  styleUrl: './admin-pages.css',
})
export class AdminPaymentsComponent implements OnInit {
  readonly payments = signal<AdminPaymentListItem[]>([]);
  readonly detail = signal<AdminPaymentDetailResponse | null>(null);
  readonly refund = signal<AdminPaymentListItem | null>(null);
  readonly loading = signal(true);
  readonly busy = signal(false);
  readonly error = signal(false);
  readonly message = signal('');
  reviewMode = false;
  processingStatus: '' | AdminPaymentProcessingStatus = '';
  orderId = '';
  providerPaymentId = '';
  reason = '';
  confirmation = '';
  constructor(
    private readonly api: AdminApiService,
    private readonly route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('paymentId');
    this.reviewMode = this.route.snapshot.url.some((segment) => segment.path === 'review');
    if (id) this.show(id);
    else this.load();
  }
  load(): void {
    this.loading.set(true);
    this.error.set(false);
    const request = this.reviewMode
      ? this.api.review({ page: 1, pageSize: 50 })
      : this.api.payments({
          processingStatus: this.processingStatus || undefined,
          orderId: this.orderId || undefined,
          providerPaymentId: this.providerPaymentId || undefined,
          page: 1,
          pageSize: 50,
        });
    request.subscribe({
      next: (response) => this.payments.set(response.items),
      error: (error: unknown) => {
        this.error.set(true);
        this.message.set(adminErrorMessage(error, 'No pudimos cargar los pagos.'));
      },
      complete: () => this.loading.set(false),
    });
  }
  show(id: string): void {
    this.api.payment(id).subscribe({
      next: (detail) => this.detail.set(detail),
      error: (error: unknown) => {
        this.error.set(true);
        this.message.set(adminErrorMessage(error, 'No pudimos cargar el pago.'));
      },
    });
  }
  resolve(payment: AdminPaymentListItem): void {
    const manual = confirm('¿Completaste una investigación manual para este pago?');
    const note = prompt('Nota de resolución (obligatoria):');
    if (!note?.trim()) return;
    this.api
      .resolveReview(payment.id, {
        resolution: manual ? 'MANUAL_INVESTIGATION_COMPLETE' : 'ACKNOWLEDGED_NO_ACTION',
        note,
      })
      .subscribe({
        next: () => {
          this.message.set('Revisión resuelta.');
          this.load();
        },
        error: (error: unknown) => {
          this.message.set(
            adminErrorCode(error) === 'PAYMENT_REVIEW_NOT_ALLOWED'
              ? 'Este caso ya fue resuelto o ya no requiere revisión.'
              : adminErrorMessage(error, 'No pudimos resolver el review.'),
          );
          this.load();
        },
      });
  }
  openRefund(payment: AdminPaymentListItem): void {
    this.refund.set(payment);
    this.reason = '';
    this.confirmation = '';
    this.message.set('');
  }
  sendRefund(): void {
    const payment = this.refund();
    if (!payment) return;
    this.busy.set(true);
    this.api
      .refund(payment.id, { reason: this.reason, confirmation: 'REEMBOLSAR' }, crypto.randomUUID())
      .subscribe({
        next: () => {
          this.refund.set(null);
          this.message.set('Refund solicitado. Revisá el estado antes de realizar otra acción.');
        },
        error: (error: unknown) =>
          this.message.set(
            adminErrorMessage(
              error,
              'No pudimos confirmar el resultado del reembolso. No vuelvas a enviarlo inmediatamente. El backend verificará el estado con el proveedor.',
            ),
          ),
        complete: () => this.busy.set(false),
      });
  }
  money(value: number): string {
    return formatArsFromCents(value);
  }
  date(value: string | null): string {
    return formatAdminDate(value);
  }
  processingLabel(value: string): string {
    return paymentProcessingStatusLabel(value);
  }
  providerLabel(value: string): string {
    return providerStatusLabel(value);
  }
}
