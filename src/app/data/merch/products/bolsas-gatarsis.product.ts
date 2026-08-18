import type { MerchProduct } from '../../../core/models/merch-product.model';

export const BOLSAS_GATARSIS_PRODUCT = {
  slug: 'bolsas-gatarsis',
  name: 'Bolsas Gatarsis',
  tagline: '',
  description: '',
  coverImage: {
    src: 'images/products/bolsa.jpeg',
    alt: 'Bolsa Gatarsis',
    width: 1536,
    height: 1024,
  },
  gallery: [],
  variants: [
    { id: 'negra', name: 'Negra', color: 'black', available: true },
    { id: 'blanca', name: 'Blanca', color: 'white', available: true },
    { id: 'lila', name: 'Lila', color: 'lilac', available: true },
  ],
  price: null,
  featured: true,
  preorderOnly: true,
} satisfies MerchProduct;
