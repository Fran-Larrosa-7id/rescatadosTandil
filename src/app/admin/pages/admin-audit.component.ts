import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { AdminDatePickerDirective } from '../shared/admin-date-picker.directive';
import { auditActionLabel, formatAdminDate } from '../core/admin-formatters';
import { AdminApiService } from '../core/admin-api.service';
import { AdminAuditLog } from '../core/admin.models';

@Component({
  standalone: true,
  imports: [FormsModule, AdminDatePickerDirective],
  template: `
    <div class="page audit-page">
      <header class="page-heading">
        <div>
          <p class="eyebrow">Trazabilidad</p>
          <h1>Auditoría</h1>
          <p class="page-description">Historial de acciones administrativas y movimientos relevantes.</p>
        </div>
        <span class="audit-count">{{ logs().length }} eventos</span>
      </header>

      <section class="audit-toolbar">
        <label>
          <span>Acción</span>
          <input [(ngModel)]="action" (ngModelChange)="load()" placeholder="Ej. Stock ajustado" />
        </label>
        <label>
          <span>Admin</span>
          <input [(ngModel)]="adminUserId" (ngModelChange)="load()" placeholder="Email o ID" />
        </label>
        <label>
          <span>Entidad</span>
          <input [(ngModel)]="entityType" (ngModelChange)="load()" placeholder="Producto, stock..." />
        </label>
        <label>
          <span>Desde</span>
          <input appAdminDatePicker [dateValue]="dateFrom" (dateValueChange)="setDate($event)" placeholder="Elegir fecha" />
        </label>
        @if (hasFilters()) {
          <button class="button button-quiet clear-filter" type="button" (click)="clearFilters()">Limpiar</button>
        }
      </section>

      @if (loading()) {
        <div class="skeleton">Cargando historial...</div>
      } @else if (error()) {
        <div class="state">
          <p>No pudimos cargar la auditoría.</p>
          <button class="button button-primary" type="button" (click)="load()">Reintentar</button>
        </div>
      } @else if (logs().length) {
        <section class="audit-log">
          @for (log of logs(); track log.id) {
            <button class="audit-entry" type="button" (click)="selected.set(log)">
              <time>{{ date(log.createdAt) }}</time>
              <span class="audit-action">
                <strong>{{ actionLabel(log.action) }}</strong>
                <small>{{ log.adminUser?.email ?? 'Sistema' }}</small>
              </span>
              <span class="audit-entity">{{ entity(log) }}</span>
              <span class="audit-detail">{{ summary(log) }}</span>
              <span class="audit-open">Ver</span>
            </button>
          }
        </section>
      } @else {
        <div class="state"><p>No hay registros con estos filtros.</p></div>
      }

      @if (selected(); as log) {
        <div class="dialog-backdrop">
          <section class="dialog audit-dialog" role="dialog" aria-modal="true" aria-labelledby="audit-title">
            <header>
              <div>
                <p class="eyebrow">Evento de auditoría</p>
                <h2 id="audit-title">{{ actionLabel(log.action) }}</h2>
              </div>
              <button class="close-button" type="button" (click)="selected.set(null)" aria-label="Cerrar">×</button>
            </header>

            <dl class="audit-dialog-facts">
              <div>
                <dt>Fecha</dt>
                <dd>{{ date(log.createdAt) }}</dd>
              </div>
              <div>
                <dt>Admin</dt>
                <dd>{{ log.adminUser?.email ?? 'Sistema' }}</dd>
              </div>
              <div>
                <dt>Entidad</dt>
                <dd>{{ entity(log) }}</dd>
              </div>
            </dl>

            @if (metadataEntries(log).length) {
              <section class="metadata-card">
                <h3>Detalles</h3>
                <dl>
                  @for (entry of metadataEntries(log); track entry.key) {
                    <div>
                      <dt>{{ entry.key }}</dt>
                      <dd>{{ entry.value }}</dd>
                    </div>
                  }
                </dl>
              </section>
            } @else {
              <p class="muted">Sin detalles adicionales.</p>
            }

            <details class="raw-json">
              <summary>Ver JSON crudo</summary>
              <pre>{{ metadataText(log) }}</pre>
            </details>

            <div class="actions">
              <button class="button button-primary" type="button" (click)="selected.set(null)">Cerrar</button>
            </div>
          </section>
        </div>
      }
    </div>
  `,
  styleUrls: ['./admin-pages.css', './admin-audit.component.css'],
})
export class AdminAuditComponent implements OnInit {
  readonly logs = signal<AdminAuditLog[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly selected = signal<AdminAuditLog | null>(null);
  action = '';
  adminUserId = '';
  entityType = '';
  dateFrom = '';

  constructor(private readonly api: AdminApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.api
      .audit({
        action: this.action || undefined,
        adminUserId: this.adminUserId || undefined,
        entityType: this.entityType || undefined,
        dateFrom: this.dateFrom || undefined,
        page: 1,
        pageSize: 50,
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => this.logs.set(response.items),
        error: () => this.error.set(true),
      });
  }

  setDate(value: string): void {
    this.dateFrom = value;
    this.load();
  }

  clearFilters(): void {
    this.action = '';
    this.adminUserId = '';
    this.entityType = '';
    this.dateFrom = '';
    this.load();
  }

  hasFilters(): boolean {
    return !!(this.action || this.adminUserId || this.entityType || this.dateFrom);
  }

  date(value: string): string {
    return formatAdminDate(value);
  }

  actionLabel(value: string): string {
    return auditActionLabel(value);
  }

  entity(log: AdminAuditLog): string {
    if (!log.entityType) return 'Sin entidad asociada';
    return `${log.entityType.toLowerCase()}${log.entityId ? ` · ${log.entityId.slice(0, 8)}` : ''}`;
  }

  summary(log: AdminAuditLog): string {
    const metadata = log.metadata;
    if (!metadata) return 'Sin detalles adicionales.';
    const reason = this.metadataValue(metadata['reason']);
    const sku = this.metadataValue(metadata['sku']);
    const quantity = this.metadataValue(metadata['quantity']);
    const movement = quantity ? `Cantidad ${quantity}` : null;
    return [sku, reason, movement].filter(Boolean).join(' · ') || `${Object.keys(metadata).length} dato(s) registrados.`;
  }

  metadataEntries(log: AdminAuditLog): Array<{ key: string; value: string }> {
    return Object.entries(log.metadata ?? {}).map(([key, value]) => ({
      key,
      value: this.metadataValue(value),
    }));
  }

  metadataText(log: AdminAuditLog): string {
    return JSON.stringify(log.metadata ?? {}, null, 2);
  }

  private metadataValue(value: unknown): string {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }
}
