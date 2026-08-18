import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { ADMIN_API_BASE_URL } from './admin-api.config';
import { AdminAuthStore } from './admin-auth.store';

export const adminAuthInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AdminAuthStore);
  const router = inject(Router);
  if (
    !request.url.startsWith(ADMIN_API_BASE_URL) ||
    request.url.includes('/auth/login') ||
    request.url.includes('/auth/refresh')
  )
    return next(request);
  const token = auth.accessToken();
  const authorized = token
    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : request;
  return next(authorized).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || request.headers.has('X-Admin-Retried'))
        return throwError(() => error);
      return auth.refresh().pipe(
        switchMap(() =>
          next(
            request.clone({
              setHeaders: { Authorization: `Bearer ${auth.accessToken()}`, 'X-Admin-Retried': '1' },
            }),
          ),
        ),
        catchError((refreshError) => {
          auth.clear();
          void router.navigate(['/admin/login']);
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
