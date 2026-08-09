import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  private readonly document = inject(DOCUMENT);

  async copy(text: string): Promise<void> {
    if (globalThis.navigator?.clipboard?.writeText) {
      await globalThis.navigator.clipboard.writeText(text);
      return;
    }

    const textArea = this.document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    this.document.body.appendChild(textArea);
    textArea.select();

    const copied = this.document.execCommand('copy');
    textArea.remove();

    if (!copied) {
      throw new Error('Clipboard copy failed');
    }
  }
}
