import type { MerchProduct } from '../../core/models/merch-product.model';
import { BOLSAS_GATARSIS_PRODUCT } from './products/bolsas-gatarsis.product';
import { LLAVEROS_GATARSIS_PRODUCT } from './products/llaveros-gatarsis.product';
import { REMERAS_GATARSIS_PRODUCT } from './products/remeras-gatarsis.product';

export const MERCH_PRODUCTS = [
  BOLSAS_GATARSIS_PRODUCT,
  LLAVEROS_GATARSIS_PRODUCT,
  REMERAS_GATARSIS_PRODUCT
] satisfies readonly MerchProduct[];
