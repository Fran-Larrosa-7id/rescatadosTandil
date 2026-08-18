import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminApiService } from '../core/admin-api.service';
import { Payment } from '../core/admin.models';

@Component({
  standalone: true,
  imports: [FormsModule, CurrencyPipe, DatePipe],
  template: `<div class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">Cobros</p>
        <h1>{{ detail() ? 'Pago' : reviewMode ? 'Pagos para revisar' : 'Pagos' }}</h1>
      </div>
    </div>
    @if (detail()) {
      <section class="surface-card detail">
        <h2>IDs</h2>
        <p>
          ID interno: <code>{{ detail()!.id }}</code>
        </p>
        <p>
          Mercado Pago Payment ID: <code>{{ detail()!.providerPaymentId || '—' }}</code>
        </p>
        <p>
          Order ID: <code>{{ detail()!.orderId }}</code>
        </p>
        <button (click)="openRefund(detail()!)">Reembolsar</button>
      </section>
    } @else if (loading()) {
      <div class="skeleton">Cargando pagos…</div>
    } @else if (payments().length) {
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Mercado Pago Payment ID</th>
              <th>Order</th>
              <th>Provider</th>
              <th>Procesamiento</th>
              <th>Importe</th>
              <th>Aprobado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            @for (p of payments(); track p.id) {
              <tr>
                <td>{{ p.providerPaymentId || '—' }}</td>
                <td>
                  <code>{{ p.orderId.slice(0, 8) }}</code>
                </td>
                <td>{{ p.providerStatus }}</td>
                <td>{{ p.processingStatus }}</td>
                <td>
                  {{
                    p.transactionAmountInCents / 100
                      | currency: 'ARS' : 'symbol' : '1.2-2' : 'es-AR'
                  }}
                </td>
                <td>{{ p.dateApproved ? (p.dateApproved | date: 'short') : '—' }}</td>
                <td>
                  <button (click)="show(p.id)">Ver</button>
                  @if (reviewMode) {
                    <button (click)="resolve(p)">Resolver</button>
                  }
                  <button (click)="openRefund(p)">Reembolsar</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    } @else {
      <p class="empty">{{ reviewMode ? 'No hay pagos para revisar.' : 'No hay pagos.' }}</p>
    }
    @if (refund()) {
      <div class="dialog-backdrop">
        <form class="dialog surface-card" (ngSubmit)="sendRefund()">
          <h2>Reembolso completo</h2>
          <p>
            <strong>Esta acción mueve dinero real.</strong> El stock NO se repone automáticamente.
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
              {{ busy() ? 'Enviando…' : 'Reembolsar' }}
            </button>
          </div>
        </form>
      </div>
    }
  </div>`,
  styleUrl: './admin-pages.css',
})
export class AdminPaymentsComponent implements OnInit {
  readonly payments = signal<Payment[]>([]);
  readonly detail = signal<Payment | null>(null);
  readonly refund = signal<Payment | null>(null);
  readonly loading = signal(true);
  readonly busy = signal(false);
  readonly message = signal('');
  reviewMode = false;
  reason = '';
  confirmation = '';
  constructor(
    private api: AdminApiService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('paymentId');
    this.reviewMode = this.route.snapshot.url.some((x) => x.path === 'review');
    if (id) this.api.payment(id).subscribe((x) => this.detail.set(x));
    else
      (this.reviewMode
        ? this.api.review()
        : this.api.payments({ page: 1, pageSize: 50 })
      ).subscribe({
        next: (r) => this.payments.set(r.items),
        error: () => this.payments.set([]),
        complete: () => this.loading.set(false),
      });
  }
  show(id: string) {
    this.api.payment(id).subscribe((x) => this.detail.set(x));
  }
  resolve(p: Payment) {
    const note = prompt('Nota de resolución (obligatoria):');
    if (!note?.trim()) return;
    this.api.resolveReview(p.id, 'ACKNOWLEDGED_NO_ACTION', note).subscribe(() => {
      this.message.set('Review resuelto.');
      this.ngOnInit();
    });
  }
  openRefund(p: Payment) {
    this.refund.set(p);
    this.reason = '';
    this.confirmation = '';
    this.message.set('');
  }
  sendRefund() {
    const p = this.refund();
    if (!p) return;
    this.busy.set(true);
    this.api.refund(p.id, this.reason, crypto.randomUUID()).subscribe({
      next: () => {
        this.refund.set(null);
        this.message.set('Refund solicitado.');
      },
      error: (e) =>
        this.message.set(
          e?.error?.code === 'PAYMENT_NOT_REFUNDABLE'
            ? 'Este pago no puede reembolsarse.'
            : 'No pudimos solicitar el refund.',
        ),
      complete: () => this.busy.set(false),
    });
  }
}
