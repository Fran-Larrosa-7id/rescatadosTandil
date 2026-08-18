import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminApiService } from '../core/admin-api.service';
import { OrderRow } from '../core/admin.models';

@Component({
  standalone: true,
  imports: [FormsModule, CurrencyPipe, DatePipe, JsonPipe],
  template: `<div class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">Ventas</p>
        <h1>{{ detail() ? 'Pedido #' + short(detail()!.id) : 'Pedidos' }}</h1>
      </div>
    </div>
    @if (detail()) {
      <pre class="technical">{{ detail() | json }}</pre>
    } @else {
      <div class="filters">
        <label
          >Estado<select [(ngModel)]="status" (ngModelChange)="load()">
            <option value="">Todos</option>
            <option>AWAITING_PAYMENT</option>
            <option>PAID</option>
            <option>EXPIRED</option>
            <option>REFUNDED</option>
          </select></label
        ><label>Desde<input type="date" [(ngModel)]="dateFrom" (ngModelChange)="load()" /></label
        ><label>Hasta<input type="date" [(ngModel)]="dateTo" (ngModelChange)="load()" /></label
        ><label>Buscar ID<input [(ngModel)]="orderId" (ngModelChange)="load()" /></label>
      </div>
      @if (loading()) {
        <div class="skeleton">Cargando pedidos…</div>
      } @else if (orders().length) {
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Estado</th>
                <th>Importe</th>
                <th>Items</th>
                <th>Creado</th>
                <th>Pagado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              @for (o of orders(); track o.id) {
                <tr>
                  <td>
                    <button (click)="show(o.id)">#{{ short(o.id) }}</button>
                  </td>
                  <td>
                    <span class="badge">{{ o.status }}</span>
                  </td>
                  <td>
                    {{ o.totalInCents / 100 | currency: 'ARS' : 'symbol' : '1.2-2' : 'es-AR' }}
                  </td>
                  <td>{{ o.itemsCount }}</td>
                  <td>{{ o.createdAt | date: 'short' }}</td>
                  <td>{{ o.paidAt ? (o.paidAt | date: 'short') : '—' }}</td>
                  <td><button (click)="copy(o.id)">Copiar ID</button></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      } @else {
        <p class="empty">No hay pedidos con estos filtros.</p>
      }
    }
  </div>`,
  styleUrl: './admin-pages.css',
})
export class AdminOrdersComponent implements OnInit {
  readonly orders = signal<OrderRow[]>([]);
  readonly loading = signal(true);
  readonly detail = signal<any>(null);
  status = '';
  dateFrom = '';
  dateTo = '';
  orderId = '';
  constructor(
    private api: AdminApiService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('orderId');
    if (id) this.api.order(id).subscribe((x) => this.detail.set(x));
    else this.load();
  }
  load() {
    this.api
      .orders({
        status: this.status,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        orderId: this.orderId,
        page: 1,
        pageSize: 50,
      })
      .subscribe({
        next: (r) => this.orders.set(r.items),
        error: () => this.orders.set([]),
        complete: () => this.loading.set(false),
      });
  }
  show(id: string) {
    this.api.order(id).subscribe((x) => this.detail.set(x));
  }
  short(id: string) {
    return id.slice(0, 8);
  }
  copy(id: string) {
    void navigator.clipboard?.writeText(id);
  }
}
