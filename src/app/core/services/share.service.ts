import { Injectable } from '@angular/core';

import { ClipboardService } from './clipboard.service';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  constructor(private readonly clipboard: ClipboardService) {}

  async share(data: { readonly title: string; readonly text: string; readonly url?: string }): Promise<'shared' | 'copied'> {
    const url = data.url ?? globalThis.location?.href ?? '';

    if (globalThis.navigator?.share) {
      await globalThis.navigator.share({
        title: data.title,
        text: data.text,
        url
      });
      return 'shared';
    }

    await this.clipboard.copy(url);
    return 'copied';
  }
}
