import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, finalize, shareReplay, tap, throwError } from 'rxjs';
import { ADMIN_API_BASE_URL } from './admin-api.config';
import { AdminUser, AuthResponse } from './admin.models';

type AuthStatus = 'anonymous' | 'authenticating' | 'authenticated' | 'refreshing';

@Injectable({ providedIn: 'root' })
export class AdminAuthStore {
  readonly admin = signal<AdminUser | null>(null);
  readonly accessToken = signal<string | null>(null);
  readonly refreshToken = signal<string | null>(null);
  readonly status = signal<AuthStatus>('anonymous');
  readonly authenticated = computed(
    () => this.status() === 'authenticated' && !!this.accessToken(),
  );
  private refreshRequest?: Observable<AuthResponse>;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  login(email: string, password: string) {
    this.status.set('authenticating');
    return this.http
      .post<AuthResponse>(`${ADMIN_API_BASE_URL}/auth/login`, { email, password })
      .pipe(
        tap((response) => this.setSession(response)),
        finalize(() => {
          if (!this.authenticated()) this.status.set('anonymous');
        }),
      );
  }

  refresh(): Observable<AuthResponse> {
    const token = this.refreshToken();
    if (!token) return throwError(() => new Error('ADMIN_SESSION_EXPIRED'));
    if (!this.refreshRequest) {
      this.status.set('refreshing');
      this.refreshRequest = this.http
        .post<AuthResponse>(`${ADMIN_API_BASE_URL}/auth/refresh`, { refreshToken: token })
        .pipe(
          tap((response) => this.setSession(response)),
          finalize(() => {
            this.refreshRequest = undefined;
            if (!this.authenticated()) this.status.set('anonymous');
          }),
          shareReplay({ bufferSize: 1, refCount: false }),
        );
    }
    return this.refreshRequest;
  }

  logout(navigate = true) {
    const token = this.refreshToken();
    const done = () => {
      this.clear();
      if (navigate) void this.router.navigate(['/admin/login']);
    };
    if (token)
      this.http
        .post(`${ADMIN_API_BASE_URL}/auth/logout`, { refreshToken: token })
        .subscribe({ complete: done, error: done });
    else done();
  }

  clear() {
    this.admin.set(null);
    this.accessToken.set(null);
    this.refreshToken.set(null);
    this.status.set('anonymous');
  }
  private setSession(response: AuthResponse) {
    this.admin.set(response.admin);
    this.accessToken.set(response.accessToken);
    this.refreshToken.set(response.refreshToken);
    this.status.set('authenticated');
  }
}
