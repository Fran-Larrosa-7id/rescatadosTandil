import { Component, input, signal } from '@angular/core';

import { ShareService } from '../../../core/services/share.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-share-button',
  imports: [IconComponent],
  template: `
    <button
      type="button"
      [class]="buttonClasses()"
      (click)="share()"
      aria-label="Compartir caso"
    >
      <app-icon name="share" class="size-5" />
      @if (showLabel()) {
        <span class="ml-2">{{ label() }}</span>
      }
    </button>
    <p class="sr-only" aria-live="polite">{{ feedback() }}</p>
  `
})
export class ShareButtonComponent {
  readonly title = input.required<string>();
  readonly text = input.required<string>();
  readonly showLabel = input(false);
  readonly fullWidth = input(false);

  protected readonly feedback = signal('');
  protected readonly label = signal('Compartir');

  constructor(private readonly shareService: ShareService) {}

  protected async share(): Promise<void> {
    try {
      const result = await this.shareService.share({
        title: this.title(),
        text: this.text()
      });
      this.feedback.set(result === 'copied' ? 'Link copiado' : 'Caso compartido');
      this.label.set(result === 'copied' ? 'Link copiado' : 'Compartido');
    } catch {
      this.feedback.set('No se pudo compartir');
      this.label.set('No se pudo compartir');
    }

    window.setTimeout(() => {
      this.feedback.set('');
      this.label.set('Compartir');
    }, 2000);
  }

  protected buttonClasses(): string {
    const widthClass = this.fullWidth() ? 'w-full' : 'min-w-11';

    return `inline-flex min-h-11 ${widthClass} items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-bold text-[var(--color-text)] transition hover:border-[var(--color-accent)]`;
  }
}
