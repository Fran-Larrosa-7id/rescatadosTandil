import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminAuthStore } from '../core/admin-auth.store';

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `<div class="admin-shell" [class.drawer-open]="drawerOpen()">
    <aside aria-label="Administración">
      <a class="admin-brand" routerLink="/admin/dashboard"
        >Gatarsis <small>Administración</small></a
      >
      <nav>
        <a routerLink="/admin/dashboard" routerLinkActive="active">Resumen</a
        ><a routerLink="/admin/products" routerLinkActive="active">Productos</a
        ><a routerLink="/admin/inventory" routerLinkActive="active">Stock</a
        ><a routerLink="/admin/orders" routerLinkActive="active">Pedidos</a
        ><a routerLink="/admin/payments" routerLinkActive="active">Pagos</a
        ><a routerLink="/admin/audit" routerLinkActive="active">Auditoría</a>
      </nav>
      <button class="link-button" (click)="logout()">Salir</button>
    </aside>
    <main>
      <header>
        <button
          class="menu-button"
          (click)="drawerOpen.set(!drawerOpen())"
          [attr.aria-expanded]="drawerOpen()"
        >
          Menú</button
        ><span>{{ auth.admin()?.email }}</span>
      </header>
      <section class="admin-content"><router-outlet /></section>
    </main>
  </div>`,
  styleUrl: './admin-shell.component.css',
})
export class AdminShellComponent {
  readonly drawerOpen = signal(false);
  constructor(readonly auth: AdminAuthStore) {}
  logout() {
    this.auth.logout();
  }
}
