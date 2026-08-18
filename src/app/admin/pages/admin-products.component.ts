import { DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminApiService } from '../core/admin-api.service';
import { Product } from '../core/admin.models';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink, DatePipe],
  template: `<div class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">Catálogo</p>
        <h1>Productos</h1>
      </div>
      <a class="button-primary button" routerLink="/admin/products/new">Nuevo producto</a>
    </div>
    <div class="filters">
      <label
        >Buscar<input
          [(ngModel)]="search"
          (ngModelChange)="load()"
          placeholder="Nombre o slug" /></label
      ><label
        >Estado<select [(ngModel)]="active" (ngModelChange)="load()">
          <option value="">Todos</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select></label
      >
    </div>
    @if (loading()) {
      <div class="skeleton">Cargando productos…</div>
    } @else if (products().length) {
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Slug</th>
              <th>Variantes</th>
              <th>Estado</th>
              <th>Destacado</th>
              <th>Actualizado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            @for (p of products(); track p.id) {
              <tr>
                <td>{{ p.name }}</td>
                <td>
                  <code>{{ p.slug }}</code>
                </td>
                <td>{{ p.variants?.length ?? '—' }}</td>
                <td>
                  <span class="badge" [class.inactive]="!p.active">{{
                    p.active ? 'Activo' : 'Inactivo'
                  }}</span>
                </td>
                <td>{{ p.featured ? 'Sí' : '—' }}</td>
                <td>{{ p.updatedAt | date: 'shortDate' }}</td>
                <td><a [routerLink]="['/admin/products', p.id]">Editar</a></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    } @else {
      <p class="empty">No hay productos.</p>
    }
  </div>`,
  styleUrl: './admin-pages.css',
})
export class AdminProductsComponent implements OnInit {
  readonly products = signal<Product[]>([]);
  readonly loading = signal(true);
  search = '';
  active = '';
  constructor(private api: AdminApiService) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.api
      .products({ search: this.search, active: this.active, page: 1, pageSize: 50 })
      .subscribe({
        next: (r) => this.products.set(r.items),
        error: () => this.products.set([]),
        complete: () => this.loading.set(false),
      });
  }
}
