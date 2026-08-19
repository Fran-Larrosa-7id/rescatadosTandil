import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminApiService } from '../core/admin-api.service';
import { adminErrorMessage } from '../core/admin-domain-error';
import { AdminInventoryItem } from '../core/admin.models';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `<div class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">Inventario</p>
        <h1>Stock</h1>
      </div>
    </div>
    @if (loading()) {
      <div class="skeleton">Cargando inventario…</div>
    } @else if (items().length) {
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Producto</th>
              <th>Variante</th>
              <th>En mano</th>
              <th>Reservado</th>
              <th>Disponible</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (i of items(); track i.variantId) {
              <tr>
                <td>{{ i.sku }}</td>
                <td>{{ i.productName }}</td>
                <td>{{ i.variantName }}</td>
                <td>{{ i.stockOnHand }}</td>
                <td>{{ i.reservedStock }}</td>
                <td>
                  <strong
                    [class.low]="
                      i.lowStockThreshold !== null && i.availableStock <= i.lowStockThreshold
                    "
                    >{{ i.availableStock }}</strong
                  >
                </td>
                <td>
                  <span class="badge" [class.inactive]="!i.active">{{ stockState(i) }}</span>
                </td>
                <td>
                  <div class="table-actions">
                    <button (click)="open(i, 'restock')">Reponer</button>
                    <button (click)="open(i, 'adjust')">Ajustar</button>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    } @else if (error()) {
      <div class="state">
        <p>No pudimos cargar el inventario.</p>
        <button class="button button-primary" type="button" (click)="load()">Reintentar</button>
      </div>
    } @else {
      <p class="empty">No hay inventario para mostrar.</p>
    }
    @if (selected()) {
      <div class="dialog-backdrop" role="presentation">
        <form class="dialog surface-card" (ngSubmit)="submit()">
          <h2>{{ mode() === 'restock' ? 'Reponer stock' : 'Ajustar stock' }}</h2>
          <p>
            {{ selected()!.productName }} · {{ selected()!.variantName }} · {{ selected()!.sku }}
          </p>
          <p>
            En mano: <strong>{{ selected()!.stockOnHand }}</strong> · Reservado:
            <strong>{{ selected()!.reservedStock }}</strong> · Disponible:
            <strong>{{ selected()!.availableStock }}</strong>
          </p>
          <label
            >{{ mode() === 'restock' ? 'Cantidad a sumar' : 'Nuevo stock en mano'
            }}<input name="amount" type="number" min="0" [(ngModel)]="amount" required
          /></label>
          @if (mode() === 'restock') {
            <p>Resultado esperado: {{ selected()!.stockOnHand + (+amount || 0) }}</p>
          }
          <label>Motivo<textarea name="reason" [(ngModel)]="reason" required></textarea></label>
          <p class="error" aria-live="polite">{{ message() }}</p>
          <div class="actions">
            <button type="button" (click)="selected.set(null)">Cancelar</button
            ><button
              class="button-primary button"
              [disabled]="
                busy() ||
                !reason.trim() ||
                (mode() === 'adjust' && +amount < selected()!.reservedStock)
              "
            >
              {{ busy() ? 'Guardando…' : 'Confirmar' }}
            </button>
          </div>
        </form>
      </div>
    }
  </div>`,
  styleUrl: './admin-pages.css',
})
export class AdminInventoryComponent implements OnInit {
  readonly items = signal<AdminInventoryItem[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly selected = signal<AdminInventoryItem | null>(null);
  readonly mode = signal<'restock' | 'adjust'>('restock');
  readonly busy = signal(false);
  readonly message = signal('');
  amount = 0;
  reason = '';
  constructor(
    private api: AdminApiService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.error.set(false);
    this.api.inventory({ page: 1, pageSize: 100 }).subscribe({
      next: (r) => this.items.set(r.items),
      error: () => this.error.set(true),
      complete: () => this.loading.set(false),
    });
  }
  open(item: AdminInventoryItem, mode: 'restock' | 'adjust') {
    this.selected.set(item);
    this.mode.set(mode);
    this.amount = mode === 'adjust' ? item.stockOnHand : 0;
    this.reason = '';
    this.message.set('');
  }
  stockState(item: AdminInventoryItem): string {
    if (item.availableStock <= 0) return 'Sin stock';
    if (item.lowStockThreshold !== null && item.availableStock <= item.lowStockThreshold)
      return 'Stock bajo';
    return item.active ? 'Disponible' : 'Inactivo';
  }
  submit() {
    const item = this.selected();
    if (!item) return;
    if (this.mode() === 'adjust' && this.amount < item.reservedStock) {
      this.message.set('El stock en mano no puede quedar por debajo del reservado.');
      return;
    }
    this.busy.set(true);
    const op =
      this.mode() === 'restock'
        ? this.api.restock(item.variantId, this.amount, this.reason)
        : this.api.adjust(item.variantId, this.amount, this.reason);
    op.subscribe({
      next: () => {
        this.selected.set(null);
        this.message.set(
          this.mode() === 'restock'
            ? 'Stock repuesto correctamente.'
            : 'Stock actualizado correctamente.',
        );
        this.load();
      },
      error: (error: unknown) =>
        this.message.set(adminErrorMessage(error, 'No pudimos actualizar el stock.')),
      complete: () => this.busy.set(false),
    });
  }
}
