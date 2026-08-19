import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { formatAdminDate, formatArsFromCents, orderStatusLabel } from '../core/admin-formatters';
import { adminErrorMessage } from '../core/admin-domain-error';
import { AdminApiService } from '../core/admin-api.service';
import { AdminOrderDetail, AdminOrderListItem, AdminOrderStatus } from '../core/admin.models';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `<div class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">Ventas</p>
        <h1>{{ detail() ? 'Pedido #' + short(detail()!.order.id) : 'Pedidos' }}</h1>
      </div>
    </div>
    @if (detail()) {
      <section class="surface-card detail">
        <h2>Pedido</h2>
        <p>
          <span class="badge">{{ statusLabel(detail()!.order.status) }}</span>
        </p>
        <p>
          ID: <code>{{ detail()!.order.id }}</code>
        </p>
        <p>Total: {{ money(detail()!.order.totalInCents) }}</p>
        <p>Creado: {{ date(detail()!.order.createdAt) }}</p>
        <p>Pago: {{ date(detail()!.order.paidAt) }}</p>
      </section>
      <section class="surface-card detail">
        <h2>Items</h2>
        @for (item of detail()!.items; track item.id) {
          <p>
            {{ item.quantity }} × {{ item.productNameSnapshot }} ·
            {{ item.variantNameSnapshot }} ({{ item.skuSnapshot }}) —
            {{ money(item.lineTotalInCents) }}
          </p>
        } @empty {
          <p>—</p>
        }
      </section>
    } @else {
      <div class="filters">
        <label
          >Estado<select [(ngModel)]="status" (ngModelChange)="load()">
            <option value="">Todos</option>
            <option value="AWAITING_PAYMENT">Esperando pago</option>
            <option value="PAYMENT_PENDING">Pago pendiente</option>
            <option value="PAID">Pagado</option>
            <option value="EXPIRED">Vencido</option>
            <option value="CANCELLED">Cancelado</option>
            <option value="REFUNDED">Reembolsado</option>
          </select></label
        ><label>Desde<input type="date" [(ngModel)]="dateFrom" (ngModelChange)="load()" /></label
        ><label>Hasta<input type="date" [(ngModel)]="dateTo" (ngModelChange)="load()" /></label
        ><label>Buscar pedido<input [(ngModel)]="orderId" (ngModelChange)="load()" /></label
        ><label>Pago MP<input [(ngModel)]="providerPaymentId" (ngModelChange)="load()" /></label>
        @if (hasFilters()) {
          <button type="button" (click)="clearFilters()">Limpiar filtros</button>
        }
      </div>
      @if (loading()) {
        <div class="skeleton">Cargando pedidos…</div>
      } @else if (error()) {
        <div class="state">
          <p>{{ message() }}</p>
          <button class="button button-primary" type="button" (click)="load()">Reintentar</button>
        </div>
      } @else if (orders().length) {
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Estado</th>
                <th class="numeric">Importe</th>
                <th class="numeric">Items</th>
                <th>Creado</th>
                <th>Pagado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (order of orders(); track order.id) {
                <tr>
                  <td>
                    <button
                      type="button"
                      (click)="show(order.id)"
                      [attr.aria-label]="'Ver pedido ' + short(order.id)"
                    >
                      #{{ short(order.id) }}
                    </button>
                  </td>
                  <td>
                    <span class="badge">{{ statusLabel(order.status) }}</span>
                  </td>
                  <td class="numeric">{{ money(order.totalInCents) }}</td>
                  <td class="numeric">{{ order.itemsCount }}</td>
                  <td>{{ date(order.createdAt) }}</td>
                  <td>{{ date(order.paidAt) }}</td>
                  <td>
                    <div class="table-actions">
                      <button type="button" (click)="show(order.id)">Ver</button
                      ><button type="button" (click)="copy(order.id)">Copiar ID</button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      } @else {
        <div class="state"><p>No hay pedidos con estos filtros.</p></div>
      }
    }
  </div>`,
  styleUrl: './admin-pages.css',
})
export class AdminOrdersComponent implements OnInit {
  readonly orders = signal<AdminOrderListItem[]>([]);
  readonly detail = signal<AdminOrderDetail | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly message = signal('');
  status: '' | AdminOrderStatus = '';
  dateFrom = '';
  dateTo = '';
  orderId = '';
  providerPaymentId = '';
  constructor(
    private readonly api: AdminApiService,
    private readonly route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('orderId');
    if (id) this.show(id);
    else this.load();
  }
  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.api
      .orders({
        status: this.status || undefined,
        dateFrom: this.dateFrom || undefined,
        dateTo: this.dateTo || undefined,
        orderId: this.orderId || undefined,
        providerPaymentId: this.providerPaymentId || undefined,
        page: 1,
        pageSize: 50,
      })
      .subscribe({
        next: (response) => this.orders.set(response.items),
        error: (error: unknown) => {
          this.error.set(true);
          this.message.set(adminErrorMessage(error, 'No pudimos cargar los pedidos.'));
        },
        complete: () => this.loading.set(false),
      });
  }
  clearFilters(): void {
    this.status = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.orderId = '';
    this.providerPaymentId = '';
    this.load();
  }
  hasFilters(): boolean {
    return !!(
      this.status ||
      this.dateFrom ||
      this.dateTo ||
      this.orderId ||
      this.providerPaymentId
    );
  }
  show(id: string): void {
    this.api.order(id).subscribe({
      next: (detail) => this.detail.set(detail),
      error: (error: unknown) => {
        this.error.set(true);
        this.message.set(adminErrorMessage(error, 'No pudimos cargar el pedido.'));
      },
    });
  }
  short(id: string): string {
    return id.slice(0, 8);
  }
  copy(id: string): void {
    void navigator.clipboard?.writeText(id);
  }
  money(value: number): string {
    return formatArsFromCents(value);
  }
  date(value: string | null): string {
    return formatAdminDate(value);
  }
  statusLabel(value: string): string {
    return orderStatusLabel(value);
  }
}
