export interface CartItem {
  variantId: string;
  productId: string;
  productSlug: string;
  productName: string;
  variantName: string;
  sku: string;
  unitPriceInCents: number;
  quantity: number;
  availableStock: number;
  imageUrl: string | null;
}

export interface StoredCart {
  version: 1;
  items: CartItem[];
}
