import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { adminErrorMessage } from '../core/admin-domain-error';
import { AdminApiService } from '../core/admin-api.service';
import { AdminOrderDetail, AdminOrderListItem, AdminOrderStatus } from '../core/admin.models';

@Component({ standalone: true, imports: [FormsModule, CurrencyPipe, DatePipe], template: `<div class="page">
  <div class="page-heading"><div><p class="eyebrow">Ventas</p><h1>{{ detail() ? 'Pedido #' + short(detail()!.order.id) : 'Pedidos' }}</h1></div></div>
  @if (detail()) {
    <section class="surface-card detail"><h2>Pedido</h2><p><span class="badge">{{ detail()!.order.status }}</span></p><p>ID: <code>{{ detail()!.order.id }}</code></p><p>Total: {{ detail()!.order.totalInCents / 100 | currency: 'ARS' : 'symbol' : '1.2-2' : 'es-AR' }}</p><p>Creado: {{ detail()!.order.createdAt | date: 'short' }}</p><p>Pago: {{ detail()!.order.paidAt ? (detail()!.order.paidAt | date: 'short') : '—' }}</p></section>
    <section class="surface-card detail"><h2>Items</h2>@for (item of detail()!.items; track item.id) { <p>{{ item.quantity }} × {{ item.productNameSnapshot }} · {{ item.variantNameSnapshot }} ({{ item.skuSnapshot }}) — {{ item.lineTotalInCents / 100 | currency: 'ARS' : 'symbol' : '1.2-2' : 'es-AR' }}</p> } @empty { <p class="empty">No hay items.</p> }</section>
    <section class="surface-card detail"><h2>Pago y movimientos</h2><p>Preferencia: {{ detail()!.paymentPreference?.providerPreferenceId ?? '—' }}</p>@for (payment of detail()!.payments; track payment.id) { <p>Pago local <code>{{ payment.id }}</code> · MP {{ payment.providerPaymentId }} · {{ payment.processingStatus }}</p> } @for (movement of detail()!.inventoryMovements; track movement.id) { <p>{{ movement.type }} · En mano {{ movement.onHandDelta }} · Reservado {{ movement.reservedDelta }}</p> }</section>
  } @else {
    <div class="filters"><label>Estado<select [(ngModel)]="status" (ngModelChange)="load()"><option value="">Todos</option><option>AWAITING_PAYMENT</option><option>PAYMENT_PENDING</option><option>PAID</option><option>EXPIRED</option><option>CANCELLED</option><option>REFUNDED</option></select></label><label>Desde<input type="date" [(ngModel)]="dateFrom" (ngModelChange)="load()" /></label><label>Hasta<input type="date" [(ngModel)]="dateTo" (ngModelChange)="load()" /></label><label>Buscar ID<input [(ngModel)]="orderId" (ngModelChange)="load()" /></label><label>Pago MP<input [(ngModel)]="providerPaymentId" (ngModelChange)="load()" /></label></div>
    @if (message()) { <p class="error" aria-live="polite">{{ message() }}</p> }
    @if (loading()) { <div class="skeleton">Cargando pedidos…</div> } @else if (orders().length) { <div class="table-wrap"><table><thead><tr><th>Pedido</th><th>Estado</th><th>Importe</th><th>Items</th><th>Creado</th><th>Pagado</th><th></th></tr></thead><tbody>@for (order of orders(); track order.id) { <tr><td><button (click)="show(order.id)">#{{ short(order.id) }}</button></td><td><span class="badge">{{ order.status }}</span></td><td>{{ order.totalInCents / 100 | currency: 'ARS' : 'symbol' : '1.2-2' : 'es-AR' }}</td><td>{{ order.itemsCount }}</td><td>{{ order.createdAt | date: 'short' }}</td><td>{{ order.paidAt ? (order.paidAt | date: 'short') : '—' }}</td><td><button (click)="copy(order.id)">Copiar ID</button></td></tr> }</tbody></table></div> } @else { <p class="empty">No hay pedidos con estos filtros.</p> }
  }
</div>`, styleUrl: './admin-pages.css' })
export class AdminOrdersComponent implements OnInit {
  readonly orders = signal<AdminOrderListItem[]>([]); readonly detail = signal<AdminOrderDetail | null>(null); readonly loading = signal(true); readonly message = signal('');
  status: '' | AdminOrderStatus = ''; dateFrom = ''; dateTo = ''; orderId = ''; providerPaymentId = '';
  constructor(private readonly api: AdminApiService, private readonly route: ActivatedRoute) {}
  ngOnInit(): void { const id = this.route.snapshot.paramMap.get('orderId'); if (id) this.show(id); else this.load(); }
  load(): void { this.loading.set(true); this.message.set(''); this.api.orders({ status: this.status || undefined, dateFrom: this.dateFrom || undefined, dateTo: this.dateTo || undefined, orderId: this.orderId || undefined, providerPaymentId: this.providerPaymentId || undefined, page: 1, pageSize: 50 }).subscribe({ next: (response) => this.orders.set(response.items), error: (error: unknown) => { this.orders.set([]); this.message.set(adminErrorMessage(error, 'No pudimos cargar los pedidos.')); }, complete: () => this.loading.set(false) }); }
  show(id: string): void { this.api.order(id).subscribe({ next: (detail) => this.detail.set(detail), error: (error: unknown) => this.message.set(adminErrorMessage(error, 'No pudimos cargar el pedido.')) }); }
  short(id: string): string { return id.slice(0, 8); }
  copy(id: string): void { void navigator.clipboard?.writeText(id); }
}
