import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthStore } from './admin-auth.store';
export const adminGuard: CanActivateFn = () =>
  inject(AdminAuthStore).authenticated() || inject(Router).createUrlTree(['/admin/login']);
