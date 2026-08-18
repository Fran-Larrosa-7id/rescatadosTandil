import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { AdminAuthStore } from './admin-auth.store';
import { ADMIN_API_BASE_URL } from './admin-api.config';

describe('AdminAuthStore', () => {
  let store: AdminAuthStore;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])] });
    store = TestBed.inject(AdminAuthStore);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('logs in and retains credentials only in signals', () => {
    store.login('admin@gatarsis.test', 'a-password-with-14').subscribe();
    const request = http.expectOne(`${ADMIN_API_BASE_URL}/auth/login`);
    expect(request.request.body).toEqual({ email: 'admin@gatarsis.test', password: 'a-password-with-14' });
    request.flush(session());
    expect(store.authenticated()).toBe(true);
    expect(store.accessToken()).toBe('access-token');
    expect(store.admin()?.role).toBe('ADMIN');
  });

  it('shares one refresh request across concurrent 401 recovery callers', () => {
    store.login('admin@gatarsis.test', 'a-password-with-14').subscribe();
    http.expectOne(`${ADMIN_API_BASE_URL}/auth/login`).flush(session());

    store.refresh().subscribe();
    store.refresh().subscribe();
    const refresh = http.expectOne(`${ADMIN_API_BASE_URL}/auth/refresh`);
    expect(refresh.request.body).toEqual({ refreshToken: 'refresh-token' });
    refresh.flush({ ...session(), accessToken: 'new-access-token' });
    expect(store.accessToken()).toBe('new-access-token');
  });

  it('logs out through the authenticated endpoint and clears the in-memory session', () => {
    const router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    store.login('admin@gatarsis.test', 'a-password-with-14').subscribe();
    http.expectOne(`${ADMIN_API_BASE_URL}/auth/login`).flush(session());

    store.logout();
    const logout = http.expectOne(`${ADMIN_API_BASE_URL}/auth/logout`);
    expect(logout.request.method).toBe('POST');
    logout.flush(null, { status: 204, statusText: 'No Content' });
    expect(store.authenticated()).toBe(false);
    expect(store.refreshToken()).toBeNull();
  });
});

function session() {
  return {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    accessTokenExpiresAt: '2026-01-01T00:15:00.000Z',
    admin: { id: 'admin-id', email: 'admin@gatarsis.test', role: 'ADMIN' as const },
  };
}
