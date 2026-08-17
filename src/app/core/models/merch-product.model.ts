import { RescueImage } from './rescue-image.model';

export interface MerchProductVariant {
  readonly id: string;
  readonly name: string;
  readonly color?: 'black' | 'white' | 'lilac';
  readonly available: boolean;
}

export interface MerchProduct {
  readonly slug: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly coverImage: RescueImage;
  readonly gallery: readonly RescueImage[];
  readonly variants: readonly MerchProductVariant[];
  readonly price: number | null;
  readonly featured: boolean;
  readonly preorderOnly: boolean;
}
