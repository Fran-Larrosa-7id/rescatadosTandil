import { Injectable } from '@angular/core';

import { RescueImage } from '../models/rescue-image.model';

@Injectable({ providedIn: 'root' })
export class PhotoSwipeService {
  private readonly dimensions = new Map<string, Pick<RescueImage, 'width' | 'height'>>();

  async open(images: readonly RescueImage[], index: number): Promise<void> {
    const { default: PhotoSwipe } = await import('photoswipe');
    const dataSource = await Promise.all(images.map((image) => this.withNaturalDimensions(image)));
    const gallery = new PhotoSwipe({
      dataSource,
      index,
      bgOpacity: 0.92,
      showHideAnimationType: 'zoom',
      wheelToZoom: true,
      padding: { top: 24, bottom: 24, left: 24, right: 24 }
    });

    gallery.init();
  }

  private async withNaturalDimensions(image: RescueImage): Promise<RescueImage> {
    const cached = this.dimensions.get(image.src);
    if (cached || typeof Image === 'undefined') return { ...image, ...cached };

    return new Promise((resolve) => {
      const element = new Image();
      element.onload = () => {
        const dimensions = { width: element.naturalWidth, height: element.naturalHeight };
        this.dimensions.set(image.src, dimensions);
        resolve({ ...image, ...dimensions });
      };
      element.onerror = () => resolve(image);
      element.src = image.src;
    });
  }
}
