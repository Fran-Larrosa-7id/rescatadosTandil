import type { MerchProduct } from '../../../core/models/merch-product.model';

export const REMERAS_GATARSIS_PRODUCT = {
  slug: 'remeras-gatarsis',
  name: 'Remeras Gatarsis',
  tagline: '',
  description: '',
  coverImage: {
    src: 'images/products/remera-mod-1.jpg',
    alt: 'Remera Gatarsis',
    width: 1390,
    height: 1132,
  },
  gallery: [
    {
      src: 'images/products/remera-mod-2.jpg',
      alt: 'Otro diseño de remera Gatarsis',
      width: 1380,
      height: 1140,
    },
    {
      src: 'images/products/remera-mod-3.jpg',
      alt: 'Diseño alternativo de remera Gatarsis',
      width: 1402,
      height: 1122,
    },
  ],
  variants: [
    { id: 'negra', name: 'Negra', color: 'black', available: true },
    { id: 'blanca', name: 'Blanca', color: 'white', available: true },
    { id: 'lila', name: 'Lila', color: 'lilac', available: true },
  ],
  sizes: ['S', 'M', 'L', 'XL'],
  price: null,
  featured: false,
  preorderOnly: true,
} satisfies MerchProduct;
