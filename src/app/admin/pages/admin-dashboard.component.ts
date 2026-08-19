import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AdminApiService } from '../core/admin-api.service';
import { AdminDashboard } from '../core/admin.models';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page">
      <header class="page-heading">
        <div>
          <p class="eyebrow">Administración</p>
          <h1>Resumen</h1>
          <p class="page-description">Una lectura breve del estado operativo.</p>
        </div>
      </header>

      @if (loading()) {
        <div class="skeleton">Cargando indicadores...</div>
      } @else if (error()) {
        <div class="state">
          <p>No pudimos cargar el resumen.</p>
          <button class="button button-primary" type="button" (click)="load()">Reintentar</button>
        </div>
      } @else if (data(); as dashboard) {
        <section class="operational-summary">
          <div class="section-heading">
            <h2>Resumen operacional</h2>
            <p>Catálogo y existencias.</p>
          </div>
          <div class="summary-band">
            <a routerLink="/admin/products">
              <strong>{{ dashboard.products.active }}</strong>
              <span>Productos activos</span>
            </a>
            <a routerLink="/admin/inventory">
              <strong>{{ dashboard.inventory.lowStockVariants }}</strong>
              <span>Stock bajo</span>
            </a>
            <a routerLink="/admin/inventory">
              <strong>{{ dashboard.inventory.outOfStockVariants }}</strong>
              <span>Sin stock</span>
            </a>
            <a routerLink="/admin/inventory">
              <strong>{{ dashboard.inventory.reservedUnits }}</strong>
              <span>Reservadas</span>
            </a>
          </div>
          <div class="summary-groups">
            <section>
              <h3>Pedidos</h3>
              <a routerLink="/admin/orders"><span>Esperando pago</span><strong>{{ dashboard.orders.awaitingPayment }}</strong></a>
              <a routerLink="/admin/orders"><span>Pago pendiente</span><strong>{{ dashboard.orders.paymentPending }}</strong></a>
              <a routerLink="/admin/orders"><span>Pagados hoy</span><strong>{{ dashboard.orders.paidToday }}</strong></a>
            </section>
            <section>
              <h3>Pagos</h3>
              <a routerLink="/admin/payments/review"><span>Reviews abiertos</span><strong>{{ dashboard.payments.openReviews }}</strong></a>
            </section>
          </div>
        </section>
      }
    </div>
  `,
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
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => this.data.set(data),
        error: () => this.error.set(true),
      });
  }
}
