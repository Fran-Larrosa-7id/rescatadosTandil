import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthStore } from '../core/admin-auth.store';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `<main class="login">
    <form (ngSubmit)="submit()" #form="ngForm" class="surface-card">
      <p class="brand">Gatarsis</p>
      <h1>Administración</h1>
      <p class="muted">Ingresá con tu cuenta de administración.</p>
      <label
        >Email<input
          name="email"
          type="email"
          autocomplete="username"
          required
          [(ngModel)]="email" /></label
      ><label
        >Contraseña<input
          name="password"
          type="password"
          autocomplete="current-password"
          required
          minlength="14"
          [(ngModel)]="password"
      /></label>
      <p class="error" aria-live="polite">{{ error() }}</p>
      <button
        class="button-primary"
        [disabled]="form.invalid || auth.status() === 'authenticating'"
      >
        {{ auth.status() === 'authenticating' ? 'Ingresando…' : 'Ingresar' }}
      </button>
    </form>
  </main>`,
  styles: `
    .login {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 1rem;
    }
    .login form {
      width: min(100%, 25rem);
      padding: 2rem;
      border: 1px solid;
    }
    .brand {
      font-weight: 800;
      color: var(--color-accent);
      margin: 0;
    }
    .muted {
      color: var(--color-text-muted);
    }
    label {
      display: grid;
      gap: 0.35rem;
      margin-top: 1rem;
      font-weight: 600;
    }
    input {
      padding: 0.7rem;
      border: 1px solid var(--color-border);
      border-radius: 0.4rem;
      background: var(--color-card);
      color: var(--color-text);
    }
    button {
      border: 0;
      border-radius: 0.4rem;
      padding: 0.75rem 1rem;
      font: inherit;
      font-weight: 700;
      margin-top: 1.25rem;
      width: 100%;
    }
    .error {
      min-height: 1.5rem;
      color: #b4233c;
      margin: 0.75rem 0 0;
    }
  `,
})
export class AdminLoginComponent {
  email = '';
  password = '';
  readonly error = signal('');
  constructor(
    readonly auth: AdminAuthStore,
    private readonly router: Router,
  ) {}
  submit() {
    this.error.set('');
    this.auth
      .login(this.email, this.password)
      .subscribe({
        next: () => void this.router.navigate(['/admin/dashboard']),
        error: () => this.error.set('No pudimos validar tus credenciales.'),
      });
  }
}
