import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { auditActionLabel, formatAdminDate } from '../core/admin-formatters';
import { AdminApiService } from '../core/admin-api.service';
import { AdminAuditLog } from '../core/admin.models';

@Component({ standalone: true, imports: [FormsModule], template: `<div class="page">
  <div class="page-heading"><div><p class="eyebrow">Trazabilidad</p><h1>Auditoría</h1></div></div>
  <div class="filters"><label>Acción<input [(ngModel)]="action" (ngModelChange)="load()" /></label><label>Admin<input [(ngModel)]="adminUserId" (ngModelChange)="load()" /></label><label>Entidad<input [(ngModel)]="entityType" (ngModelChange)="load()" /></label><label>Desde<input type="date" [(ngModel)]="dateFrom" (ngModelChange)="load()" /></label></div>
  @if (loading()) { <div class="skeleton">Cargando auditoría…</div> } @else if (error()) { <div class="state"><p>No pudimos cargar la auditoría.</p><button class="button button-primary" type="button" (click)="load()">Reintentar</button></div> } @else if (logs().length) { <div class="table-wrap"><table><thead><tr><th>Fecha</th><th>Acción</th><th>Admin</th><th>Entidad</th><th>Detalle</th></tr></thead><tbody>@for (log of logs(); track log.id) { <tr><td>{{ date(log.createdAt) }}</td><td>{{ actionLabel(log.action) }}</td><td>{{ log.adminUser?.email ?? 'Sistema' }}</td><td>{{ entity(log) }}</td><td>{{ metadata(log) }}</td></tr> }</tbody></table></div> } @else { <div class="state"><p>No hay registros de auditoría.</p></div> }
</div>`, styleUrl: './admin-pages.css' })
export class AdminAuditComponent implements OnInit {
  readonly logs = signal<AdminAuditLog[]>([]); readonly loading = signal(true); readonly error = signal(false);
  action = ''; adminUserId = ''; entityType = ''; dateFrom = '';
  constructor(private readonly api: AdminApiService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.loading.set(true); this.error.set(false); this.api.audit({ action: this.action, adminUserId: this.adminUserId, entityType: this.entityType, dateFrom: this.dateFrom, page: 1, pageSize: 50 }).subscribe({ next: (response) => this.logs.set(response.items), error: () => this.error.set(true), complete: () => this.loading.set(false) }); }
  date(value: string): string { return formatAdminDate(value); } actionLabel(value: string): string { return auditActionLabel(value); }
  entity(log: AdminAuditLog): string { return log.entityType ? `${log.entityType}${log.entityId ? ` · ${log.entityId.slice(0, 8)}` : ''}` : '—'; }
  metadata(log: AdminAuditLog): string { return log.metadata ? Object.entries(log.metadata).map(([key, value]) => `${key}: ${String(value)}`).join(' · ') : '—'; }
}
