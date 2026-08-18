import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'casos',
    loadComponent: () =>
      import('./features/cases/cases-page.component').then((m) => m.CasesPageComponent),
  },
  {
    path: 'casos/:slug',
    loadComponent: () =>
      import('./features/case-detail/case-detail-page.component').then(
        (m) => m.CaseDetailPageComponent,
      ),
  },
  {
    path: 'donde-va-tu-ayuda',
    loadComponent: () =>
      import('./features/transparency/transparency-page.component').then(
        (m) => m.TransparencyPageComponent,
      ),
  },
  {
    path: 'transparencia',
    redirectTo: 'donde-va-tu-ayuda',
    pathMatch: 'full',
  },
  {
    path: 'merch',
    loadComponent: () =>
      import('./features/merch/merch-page.component').then((m) => m.MerchPageComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
