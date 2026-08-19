import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminAuthStore } from '../core/admin-auth.store';

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `<div class="admin-shell" [class.drawer-open]="drawerOpen()">
    <aside aria-label="Administración" class="border-r border-[#e9e1ef] bg-[#fbf8f3] px-4 py-5 text-[#302d34]">
      <a class="admin-brand" routerLink="/admin/dashboard" (click)="closeDrawer()"><span class="text-xl font-black tracking-tight">Gatarsis</span><small class="mt-1 text-[10px] font-bold tracking-[.16em] text-[#725a9c]">ADMINISTRACIÓN</small></a>
      <nav class="mt-10" aria-label="Secciones"><a routerLink="/admin/dashboard" routerLinkActive="active" ariaCurrentWhenActive="page" (click)="closeDrawer()">Resumen</a><a routerLink="/admin/products" routerLinkActive="active" ariaCurrentWhenActive="page" (click)="closeDrawer()">Productos</a><a routerLink="/admin/inventory" routerLinkActive="active" ariaCurrentWhenActive="page" (click)="closeDrawer()">Stock</a><a routerLink="/admin/orders" routerLinkActive="active" ariaCurrentWhenActive="page" (click)="closeDrawer()">Pedidos</a><a routerLink="/admin/payments" routerLinkActive="active" ariaCurrentWhenActive="page" (click)="closeDrawer()">Pagos</a><a routerLink="/admin/audit" routerLinkActive="active" ariaCurrentWhenActive="page" (click)="closeDrawer()">Auditoría</a></nav>
      <div class="account"><span class="text-[10px] font-bold uppercase tracking-[.14em] text-[#725a9c]">Administrador</span><span class="truncate text-xs">{{ auth.admin()?.email }}</span><button class="link-button mt-3" (click)="logout()">Cerrar sesión</button></div>
    </aside>
    <main><header class="flex min-h-14 items-center justify-between border-b border-[#e9e1ef] px-4 sm:px-7"><button class="menu-button" type="button" (click)="drawerOpen.set(!drawerOpen())" [attr.aria-expanded]="drawerOpen()" aria-controls="admin-navigation">Menú</button><p class="m-0 text-xs font-semibold tracking-wide text-[var(--color-text-muted)]">GATARSIS · BACKOFFICE</p></header><section class="admin-content"><router-outlet /></section></main>
  </div>`,
  styleUrl: './admin-shell.component.css',
})
export class AdminShellComponent { readonly drawerOpen = signal(false); constructor(readonly auth: AdminAuthStore) {} closeDrawer(): void { this.drawerOpen.set(false); } logout(): void { this.auth.logout(); } }
