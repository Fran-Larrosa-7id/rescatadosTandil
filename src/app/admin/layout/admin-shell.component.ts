import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminAuthStore } from '../core/admin-auth.store';

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `<div class="admin-shell" [class.drawer-open]="drawerOpen()">
    <aside aria-label="Administración">
      <a class="admin-brand" routerLink="/admin/dashboard" (click)="closeDrawer()">Gatarsis <small>Administración</small></a>
      <nav>
        <a routerLink="/admin/dashboard" routerLinkActive="active" ariaCurrentWhenActive="page" (click)="closeDrawer()">Resumen</a>
        <a routerLink="/admin/products" routerLinkActive="active" ariaCurrentWhenActive="page" (click)="closeDrawer()">Productos</a>
        <a routerLink="/admin/inventory" routerLinkActive="active" ariaCurrentWhenActive="page" (click)="closeDrawer()">Stock</a>
        <a routerLink="/admin/orders" routerLinkActive="active" ariaCurrentWhenActive="page" (click)="closeDrawer()">Pedidos</a>
        <a routerLink="/admin/payments" routerLinkActive="active" ariaCurrentWhenActive="page" (click)="closeDrawer()">Pagos</a>
        <a routerLink="/admin/audit" routerLinkActive="active" ariaCurrentWhenActive="page" (click)="closeDrawer()">Auditoría</a>
      </nav>
      <button class="link-button" (click)="logout()">Cerrar sesión</button>
    </aside>
    <main>
      <header><button class="menu-button" type="button" (click)="drawerOpen.set(!drawerOpen())" [attr.aria-expanded]="drawerOpen()" aria-controls="admin-navigation">Menú</button><div class="admin-identity"><strong>Administrador</strong><span>{{ auth.admin()?.email }}</span></div></header>
      <section class="admin-content"><router-outlet /></section>
    </main>
  </div>`,
  styleUrl: './admin-shell.component.css',
})
export class AdminShellComponent {
  readonly drawerOpen = signal(false);
  constructor(readonly auth: AdminAuthStore) {}
  closeDrawer(): void { this.drawerOpen.set(false); }
  logout(): void { this.auth.logout(); }
}
