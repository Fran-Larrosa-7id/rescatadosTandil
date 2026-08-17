import { Injectable } from '@angular/core';

import { RescueImage } from '../models/rescue-image.model';

@Injectable({ providedIn: 'root' })
export class PhotoSwipeService {
  async open(images: readonly RescueImage[], index: number): Promise<void> {
    const { default: PhotoSwipe } = await import('photoswipe');
    const gallery = new PhotoSwipe({
      dataSource: [...images],
      index,
      bgOpacity: 0.92,
      showHideAnimationType: 'zoom',
      wheelToZoom: true,
      padding: { top: 24, bottom: 24, left: 24, right: 24 }
    });

    gallery.init();
  }
}
