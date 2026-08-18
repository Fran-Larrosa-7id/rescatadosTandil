import type { MerchProduct } from '../../../core/models/merch-product.model';

export const LLAVEROS_GATARSIS_PRODUCT = {
  slug: 'llaveros-gatarsis',
  name: 'Llaveros Gatarsis',
  tagline: '',
  description: '',
  coverImage: {
    src: 'images/products/llavero-mod-1.jpeg',
    alt: 'Llavero Gatarsis',
    width: 1536,
    height: 1024,
  },
  gallery: [
    {
      src: 'images/products/llavero-mod-2.jpeg',
      alt: 'Variante de llavero Gatarsis',
      width: 1536,
      height: 1024,
    },
    {
      src: 'images/products/llavero-mod-3.jpeg',
      alt: 'Otra variante de llavero Gatarsis',
      width: 1536,
      height: 1024,
    },
  ],
  variants: [
    { id: 'negro', name: 'Negro', color: 'black', available: true },
    { id: 'blanco', name: 'Blanco', color: 'white', available: true },
    { id: 'lila', name: 'Lila', color: 'lilac', available: true },
  ],
  price: null,
  featured: true,
  preorderOnly: true,
} satisfies MerchProduct;
