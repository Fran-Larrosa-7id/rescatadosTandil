import { Component, input, signal } from '@angular/core';

import { ClipboardService } from '../../../core/services/clipboard.service';
import { IconComponent, IconName } from '../icon/icon.component';

type CopyState = 'idle' | 'success' | 'error';

@Component({
  selector: 'app-copy-alias-button',
  imports: [IconComponent],
  template: `
    <button
      type="button"
      [class]="buttonClasses()"
      (click)="copy()"
    >
      <app-icon [name]="iconName()" class="size-4" />
      <span class="min-w-28 text-center">{{ label() }}</span>
    </button>
    <p class="sr-only" aria-live="polite">{{ feedback() }}</p>
  `
})
export class CopyAliasButtonComponent {
  readonly text = input.required<string>();
  readonly variant = input<'primary' | 'secondary'>('primary');

  protected readonly primaryClasses =
    'bg-[var(--color-accent)] text-white shadow-sm hover:bg-[var(--color-accent-hover)]';
  protected readonly secondaryClasses =
    'border border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-accent)]';

  private readonly state = signal<CopyState>('idle');
  private resetTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(private readonly clipboard: ClipboardService) {}

  protected label(): string {
    switch (this.state()) {
      case 'success':
        return 'Alias copiado';
      case 'error':
        return 'No se pudo copiar';
      default:
        return 'Copiar alias';
    }
  }

  protected feedback(): string {
    return this.state() === 'error'
      ? 'No se pudo copiar. Mantené presionado el alias para copiarlo.'
      : this.label();
  }

  protected buttonClasses(): string {
    const baseClasses =
      'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold transition';
    const variantClasses = this.variant() === 'primary' ? this.primaryClasses : this.secondaryClasses;

    return `${baseClasses} ${variantClasses}`;
  }

  protected iconName(): IconName {
    switch (this.state()) {
      case 'success':
        return 'check';
      case 'error':
        return 'x';
      default:
        return 'copy';
    }
  }

  protected async copy(): Promise<void> {
    window.clearTimeout(this.resetTimer);

    try {
      await this.clipboard.copy(this.text());
      this.state.set('success');
    } catch {
      this.state.set('error');
    }

    this.resetTimer = window.setTimeout(() => this.state.set('idle'), 2000);
  }
}
