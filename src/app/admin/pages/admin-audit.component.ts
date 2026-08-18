import { Component, OnInit, signal } from '@angular/core';
import { DatePipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService } from '../core/admin-api.service';
import { AdminAuditLog } from '../core/admin.models';
@Component({
  standalone: true,
  imports: [FormsModule, DatePipe, JsonPipe],
  template: `<div class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">Trazabilidad</p>
        <h1>Auditoría</h1>
      </div>
    </div>
    <div class="filters">
      <label>Acción<input [(ngModel)]="action" (ngModelChange)="load()" /></label
      ><label>Admin<input [(ngModel)]="adminUserId" (ngModelChange)="load()" /></label
      ><label>Entidad<input [(ngModel)]="entityType" (ngModelChange)="load()" /></label
      ><label>Desde<input type="date" [(ngModel)]="dateFrom" (ngModelChange)="load()" /></label>
    </div>
    @if (loading()) {
      <div class="skeleton">Cargando auditoría…</div>
    } @else if (logs().length) {
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Acción</th>
              <th>Admin</th>
              <th>Entidad</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            @for (log of logs(); track log.id) {
              <tr>
                <td>{{ log.createdAt | date: 'short' }}</td>
                <td>{{ log.action }}</td>
                <td>{{ log.adminUser?.email || 'Sistema' }}</td>
                <td>{{ log.entityType }} {{ log.entityId?.slice(0, 8) }}</td>
                <td>
                  <code>{{ log.metadata | json }}</code>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    } @else {
      <p class="empty">No hay registros de auditoría.</p>
    }
  </div>`,
  styleUrl: './admin-pages.css',
})
export class AdminAuditComponent implements OnInit {
  readonly logs = signal<AdminAuditLog[]>([]);
  readonly loading = signal(true);
  action = '';
  adminUserId = '';
  entityType = '';
  dateFrom = '';
  constructor(private api: AdminApiService) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.api
      .audit({
        action: this.action,
        adminUserId: this.adminUserId,
        entityType: this.entityType,
        dateFrom: this.dateFrom,
        page: 1,
        pageSize: 50,
      })
      .subscribe({
        next: (r) => this.logs.set(r.items),
        error: () => this.logs.set([]),
        complete: () => this.loading.set(false),
      });
  }
}
