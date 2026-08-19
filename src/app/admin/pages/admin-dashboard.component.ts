import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminApiService } from '../core/admin-api.service';
import { AdminDashboard } from '../core/admin.models';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `<div class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">Administración</p>
        <h1>Resumen</h1>
      </div>
    </div>
    @if (loading()) {
      <div class="skeleton">Cargando indicadores…</div>
    } @else if (error()) {
      <div class="state">
        <p>No pudimos cargar el resumen.</p>
        <button class="button button-primary" type="button" (click)="load()">Reintentar</button>
      </div>
    } @else if (data(); as dashboard) {
      <div class="cards">
        <a routerLink="/admin/products"
          ><span>Productos activos</span><strong>{{ dashboard.products.active }}</strong></a
        >
        <a routerLink="/admin/inventory"
          ><span>Stock bajo</span><strong>{{ dashboard.inventory.lowStockVariants }}</strong></a
        >
        <a routerLink="/admin/inventory"
          ><span>Sin stock</span><strong>{{ dashboard.inventory.outOfStockVariants }}</strong></a
        >
        <a routerLink="/admin/inventory"
          ><span>Unidades reservadas</span
          ><strong>{{ dashboard.inventory.reservedUnits }}</strong></a
        >
        <a routerLink="/admin/orders"
          ><span>Esperando pago</span><strong>{{ dashboard.orders.awaitingPayment }}</strong></a
        >
        <a routerLink="/admin/orders"
          ><span>Pago pendiente</span><strong>{{ dashboard.orders.paymentPending }}</strong></a
        >
        <a routerLink="/admin/orders"
          ><span>Pagados hoy</span><strong>{{ dashboard.orders.paidToday }}</strong></a
        >
        <a routerLink="/admin/payments/review"
          ><span>Reviews abiertos</span><strong>{{ dashboard.payments.openReviews }}</strong></a
        >
      </div>
    }
  </div>`,
  styleUrl: './admin-pages.css',
})
export class AdminDashboardComponent implements OnInit {
  readonly data = signal<AdminDashboard | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  constructor(private readonly api: AdminApiService) {}
  ngOnInit(): void {
    this.load();
  }
  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.api
      .dashboard()
      .subscribe({
        next: (data) => this.data.set(data),
        error: () => this.error.set(true),
        complete: () => this.loading.set(false),
      });
  }
}
