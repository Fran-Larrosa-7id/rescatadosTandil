import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminApiService } from '../core/admin-api.service';
import { Dashboard } from '../core/admin.models';

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
    } @else if (data()) {
      <div class="cards">
        <a routerLink="/admin/products"
          ><strong>{{ data()!.products.active }}</strong
          ><span>Productos activos</span></a
        ><a routerLink="/admin/inventory"
          ><strong>{{ data()!.inventory.lowStockVariants }}</strong
          ><span>Stock bajo</span></a
        ><a routerLink="/admin/inventory"
          ><strong>{{ data()!.inventory.outOfStockVariants }}</strong
          ><span>Sin stock</span></a
        ><a routerLink="/admin/inventory"
          ><strong>{{ data()!.inventory.reservedUnits }}</strong
          ><span>Unidades reservadas</span></a
        ><a routerLink="/admin/orders"
          ><strong>{{ data()!.orders.awaitingPayment }}</strong
          ><span>Esperando pago</span></a
        ><a routerLink="/admin/orders"
          ><strong>{{ data()!.orders.paidToday }}</strong
          ><span>Pagados hoy</span></a
        ><a routerLink="/admin/payments/review"
          ><strong>{{ data()!.payments.openReviews }}</strong
          ><span>Reviews abiertos</span></a
        >
      </div>
    } @else {
      <p class="error">No fue posible cargar el resumen.</p>
    }
  </div>`,
  styleUrl: './admin-pages.css',
})
export class AdminDashboardComponent implements OnInit {
  readonly data = signal<Dashboard | null>(null);
  readonly loading = signal(true);
  constructor(private api: AdminApiService) {}
  ngOnInit() {
    this.api
      .dashboard()
      .subscribe({
        next: (x) => this.data.set(x),
        error: () => this.data.set(null),
        complete: () => this.loading.set(false),
      });
  }
}
