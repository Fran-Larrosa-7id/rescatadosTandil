import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { AdminApiService } from '../core/admin-api.service';
import { adminErrorMessage } from '../core/admin-domain-error';
import { AdminFeedback } from '../core/admin-feedback';
import { AdminInventoryItem } from '../core/admin.models';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="page inventory-page">
      <header class="page-heading">
        <div>
          <p class="eyebrow">Inventario</p>
          <h1>Stock</h1>
          <p class="page-description">Controlá existencias, reservas y reposiciones.</p>
        </div>
      </header>

      @if (notice()) {
        <p class="feedback" [class]="'feedback ' + notice()!.kind" aria-live="polite">
          {{ notice()!.message }}
        </p>
      }

      @if (loading()) {
        <div class="skeleton">Cargando inventario...</div>
      } @else if (error()) {
        <div class="state">
          <p>No pudimos cargar el inventario.</p>
          <button class="button button-primary" type="button" (click)="load()">Reintentar</button>
        </div>
      } @else if (items().length) {
        <div class="inventory-summary">
          <span><strong>{{ availableTotal() }}</strong> disponibles</span>
          <span><strong>{{ reservedTotal() }}</strong> reservadas</span>
          <span><strong>{{ outOfStock() }}</strong> sin stock</span>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Producto / variante</th>
                <th>SKU</th>
                <th class="numeric">En mano</th>
                <th class="numeric">Reservado</th>
                <th class="numeric">Disponible</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (item of items(); track item.variantId) {
                <tr>
                  <td>
                    <strong>{{ item.productName }}</strong>
                    <br />
                    <span class="muted">{{ item.variantName }}</span>
                  </td>
                  <td><code>{{ item.sku }}</code></td>
                  <td class="numeric">{{ item.stockOnHand }}</td>
                  <td class="numeric">{{ item.reservedStock }}</td>
                  <td class="numeric">
                    <strong [class.low]="item.availableStock <= 0">{{ item.availableStock }}</strong>
                  </td>
                  <td>
                    <div class="table-actions">
                      <button class="action-button" type="button" (click)="open(item, 'restock')">
                        Reponer
                      </button>
                      <button class="action-button" type="button" (click)="open(item, 'adjust')">
                        Ajustar
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      } @else {
        <div class="state"><p>No hay inventario para mostrar.</p></div>
      }

      @if (selected(); as item) {
        <div class="dialog-backdrop">
          <form class="dialog stock-dialog" (ngSubmit)="submit()">
            <header>
              <div>
                <p class="eyebrow">Inventario</p>
                <h2>{{ mode() === 'restock' ? 'Reponer stock' : 'Ajustar stock' }}</h2>
              </div>
              <button
                type="button"
                class="close-button"
                (click)="selected.set(null)"
                aria-label="Cerrar"
              >
                ×
              </button>
            </header>

            <div class="stock-product">
              <strong>{{ item.productName }}</strong>
              <span>{{ item.variantName }} · {{ item.sku }}</span>
            </div>

            <div class="stock-metrics">
              <div><span>En mano</span><strong>{{ item.stockOnHand }}</strong></div>
              <div><span>Reservado</span><strong>{{ item.reservedStock }}</strong></div>
              <div><span>Disponible</span><strong>{{ item.availableStock }}</strong></div>
            </div>

            <label>
              {{ mode() === 'restock' ? 'Cantidad a sumar' : 'Nuevo stock en mano' }}
              <input
                name="amount"
                type="number"
                [min]="mode() === 'restock' ? 1 : item.reservedStock"
                [(ngModel)]="amount"
                required
              />
            </label>

            <div class="stock-result">
              <span>{{ mode() === 'restock' ? 'Stock resultante' : 'Disponible resultante' }}</span>
              <strong>{{ resultStock() }}</strong>
            </div>

            <label>
              Motivo
              <textarea
                name="reason"
                [(ngModel)]="reason"
                required
                [placeholder]="mode() === 'restock' ? 'Nueva tanda de producción' : 'Conteo físico'"
              ></textarea>
              <small>Se guarda en el historial de inventario.</small>
            </label>

            @if (validationMessage()) {
              <p class="feedback error" aria-live="polite">{{ validationMessage() }}</p>
            } @else if (message()) {
              <p class="feedback error" aria-live="polite">{{ message() }}</p>
            }

            <div class="actions">
              <button type="button" class="button button-quiet" (click)="selected.set(null)">
                Cancelar
              </button>
              <button class="button button-primary" [disabled]="busy() || !!validationMessage()">
                {{
                  busy()
                    ? 'Actualizando...'
                    : mode() === 'restock'
                      ? 'Reponer stock'
                      : 'Confirmar ajuste'
                }}
              </button>
            </div>
          </form>
        </div>
      }
    </div>
  `,
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
  readonly notice = signal<AdminFeedback | null>(null);
  amount = 0;
  reason = '';

  constructor(private readonly api: AdminApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.api
      .inventory({ page: 1, pageSize: 100 })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => this.items.set(response.items),
        error: () => this.error.set(true),
      });
  }

  open(item: AdminInventoryItem, mode: 'restock' | 'adjust'): void {
    this.selected.set(item);
    this.mode.set(mode);
    this.amount = mode === 'adjust' ? item.stockOnHand : 0;
    this.reason = '';
    this.message.set('');
  }

  availableTotal(): number {
    return this.items().reduce((total, item) => total + item.availableStock, 0);
  }

  reservedTotal(): number {
    return this.items().reduce((total, item) => total + item.reservedStock, 0);
  }

  outOfStock(): number {
    return this.items().filter((item) => item.availableStock === 0).length;
  }

  resultStock(): number {
    const item = this.selected();
    if (!item) return 0;
    const amount = Number(this.amount) || 0;
    return this.mode() === 'restock'
      ? item.stockOnHand + Math.max(0, amount)
      : Math.max(0, amount) - item.reservedStock;
  }

  validationMessage(): string {
    const item = this.selected();
    if (!item) return '';
    const amount = Number(this.amount);
    if (!Number.isInteger(amount) || amount < (this.mode() === 'restock' ? 1 : item.reservedStock)) {
      return this.mode() === 'restock'
        ? 'Ingresá una cantidad entera mayor que cero.'
        : `No se puede dejar el stock en mano por debajo de ${item.reservedStock} reservado(s).`;
    }
    return !this.reason.trim() ? 'Indicá un motivo para registrar este movimiento.' : '';
  }

  submit(): void {
    const item = this.selected();
    if (!item || this.validationMessage()) return;
    this.busy.set(true);
    const request =
      this.mode() === 'restock'
        ? this.api.restock(item.variantId, this.amount, this.reason)
        : this.api.adjust(item.variantId, this.amount, this.reason);
    request.pipe(finalize(() => this.busy.set(false))).subscribe({
      next: (response) => {
        const mode = this.mode();
        this.items.update((items) =>
          items.map((current) =>
            current.variantId === item.variantId
              ? {
                  ...current,
                  stockOnHand: response.stockOnHand,
                  reservedStock: response.reservedStock,
                  availableStock: response.stockOnHand - response.reservedStock,
                }
              : current,
          ),
        );
        this.selected.set(null);
        this.notice.set({ kind: 'success', message: mode === 'restock' ? 'Stock repuesto.' : 'Stock ajustado.' });
      },
      error: (error: unknown) =>
        this.message.set(adminErrorMessage(error, 'No pudimos actualizar el stock.')),
    });
  }
}
