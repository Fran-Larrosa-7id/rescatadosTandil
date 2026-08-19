import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { formatAdminDate } from '../core/admin-formatters';
import { AdminApiService } from '../core/admin-api.service';
import { AdminProductListItem } from '../core/admin.models';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `<div class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">Catálogo</p>
        <h1>Productos</h1>
      </div>
      <a class="button-primary button" routerLink="/admin/products/new">+ Nuevo producto</a>
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
    } @else if (error()) {
      <div class="state">
        <p>No pudimos cargar los productos.</p>
        <button class="button button-primary" type="button" (click)="load()">Reintentar</button>
      </div>
    } @else if (products().length) {
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Slug</th>
              <th class="numeric">Variantes</th>
              <th>Estado</th>
              <th>Destacado</th>
              <th>Actualizado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (product of products(); track product.id) {
              <tr>
                <td>{{ product.name }}</td>
                <td>
                  <code>{{ product.slug }}</code>
                </td>
                <td class="numeric">{{ product.variants.length }}</td>
                <td>
                  <span class="badge" [class.inactive]="!product.active">{{
                    product.active ? 'Activo' : 'Inactivo'
                  }}</span>
                </td>
                <td>{{ product.featured ? 'Sí' : 'No' }}</td>
                <td>{{ date(product.updatedAt) }}</td>
                <td>
                  <div class="table-actions">
                    <a [routerLink]="['/admin/products', product.id]">Editar</a>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    } @else {
      <div class="state">
        <p>Todavía no hay productos.</p>
        <p>Creá el primero para empezar a cargar la tienda.</p>
        <a class="button button-primary" routerLink="/admin/products/new">Crear producto</a>
      </div>
    }
  </div>`,
  styleUrl: './admin-pages.css',
})
export class AdminProductsComponent implements OnInit {
  readonly products = signal<AdminProductListItem[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  search = '';
  active: '' | 'true' | 'false' = '';
  constructor(private readonly api: AdminApiService) {}
  ngOnInit(): void {
    this.load();
  }
  date(value: string): string {
    return formatAdminDate(value);
  }
  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.api
      .products({
        search: this.search,
        active: this.active === '' ? undefined : this.active === 'true',
        page: 1,
        pageSize: 50,
      })
      .subscribe({
        next: (response) => this.products.set(response.items),
        error: () => this.error.set(true),
        complete: () => this.loading.set(false),
      });
  }
}
