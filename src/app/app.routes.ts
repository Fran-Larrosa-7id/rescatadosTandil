import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home-page.component').then((m) => m.HomePageComponent)
  },
  {
    path: 'casos',
    loadComponent: () =>
      import('./features/cases/cases-page.component').then((m) => m.CasesPageComponent)
  },
  {
    path: 'casos/:slug',
    loadComponent: () =>
      import('./features/case-detail/case-detail-page.component').then(
        (m) => m.CaseDetailPageComponent
      )
  },
  {
    path: 'transparencia',
    loadComponent: () =>
      import('./features/transparency/transparency-page.component').then(
        (m) => m.TransparencyPageComponent
      )
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found-page.component').then(
        (m) => m.NotFoundPageComponent
      )
  }
];
