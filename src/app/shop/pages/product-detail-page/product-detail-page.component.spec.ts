import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { PhotoSwipeService } from '../../../core/services/photo-swipe.service';
import { CartStore } from '../../core/cart.store';
import { PUBLIC_API_BASE_URL, PublicProduct } from '../../core/commerce.models';
import { ProductDetailPageComponent } from './product-detail-page.component';

describe('ProductDetailPageComponent variant pricing', () => {
  let fixture: ComponentFixture<ProductDetailPageComponent>;
  let component: ProductDetailPageComponent;
  let http: HttpTestingController;
  let cart: CartStore;
  let product: PublicProduct;

  beforeEach(() => {
    localStorage.clear();
    product = makeProduct();
    TestBed.configureTestingModule({
      imports: [ProductDetailPageComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ slug: product.slug }) } },
        },
      ],
    });

    fixture = TestBed.createComponent(ProductDetailPageComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    cart = TestBed.inject(CartStore);
    fixture.detectChanges();
    http.expectOne(`${PUBLIC_API_BASE_URL}/products`).flush([product]);
  });

  afterEach(() => {
    fixture.destroy();
    http.verify();
    localStorage.clear();
  });

  it('uses the initially selected variant price instead of the catalog minimum', () => {
    const selected = product.variants[0];

    expect(component.selectedVariant()?.id).toBe(selected.id);
    expect(component.priceLabel(product)).toBe(component.money(selected.priceInCents));
    expect(component.selectedMedia()?.id).toBe('white-image');
  });

  it('uses effective legacy color attributes for swatches and never renders a SKU publicly', () => {
    fixture.detectChanges();

    expect(component.usesStructuredAttributes(product)).toBe(true);
    expect(component.structuredAttributeKeys(product)).toEqual(['color']);
    expect(fixture.nativeElement.textContent).toContain('Color');
    expect(fixture.nativeElement.textContent).not.toContain('SKU-B');
    expect(fixture.nativeElement.textContent).not.toContain('SKU-N');
  });

  it('updates price, media, stock and quantity when changing the selected variant', () => {
    component.quantity.set(3);
    component.selectVariant(product.variants[1]);

    expect(component.selectedVariant()?.id).toBe('black');
    expect(component.priceLabel(product)).toBe(component.money(100));
    expect(component.selectedMedia()?.id).toBe('black-image');
    expect(component.stockText(product.variants[1])).toBe('Quedan 1');
    expect(component.quantity()).toBe(1);

    component.selectVariant(product.variants[2]);

    expect(component.priceLabel(product)).toBe(component.money(150));
    expect(component.selectedMedia()?.id).toBe('lilac-image');
    expect(component.stockText(product.variants[2])).toBe('Disponible');
  });

  it('opens the selected variant gallery from the public product image', async () => {
    const photoSwipe = TestBed.inject(PhotoSwipeService);
    const open = vi.spyOn(photoSwipe, 'open').mockResolvedValue();
    component.selectVariant(product.variants[1]);

    await component.openGallery(product);

    expect(open).toHaveBeenCalledWith(
      [expect.objectContaining({ src: 'black.jpg', alt: 'Llavero negro' })],
      0,
    );
  });

  it('adds the selected variant and its exact price to the cart', () => {
    const selected = product.variants[1];
    component.selectVariant(selected);
    component.addToCart(product, selected);

    expect(cart.items()).toEqual([
      expect.objectContaining({
        variantId: 'black',
        sku: 'SKU-N',
        variantName: 'Negro',
        unitPriceInCents: 100,
        availableStock: 1,
        imageUrl: 'black.jpg',
      }),
    ]);
  });

  it('resolves color and size to one concrete variant without carrying an invalid size across colors', () => {
    const structured = makeStructuredProduct();

    component.selectAttribute(structured, 'color', 'Blanco');

    expect(component.selectedVariant()).toBeNull();
    expect(component.priceLabel(structured)).toBe(component.money(1500));
    expect(component.attributeOptions(structured, 'size')).toEqual(['S', 'M']);
    expect(component.isAttributeOptionDisabled(structured, 'size', 'M')).toBe(true);
    expect(component.selectedMedia()?.id).toBe('blanco-image');

    component.selectAttribute(structured, 'size', 'S');

    expect(component.selectedVariant()?.id).toBe('blanco-s');
    expect(component.priceLabel(structured)).toBe(component.money(1500));
    expect(component.stockText(component.selectedVariant()!)).toBe('Quedan 2');

    component.selectAttribute(structured, 'color', 'Negro');

    expect(component.selectedVariant()).toBeNull();
    expect(component.selectedAttributes()).toEqual({ color: 'Negro' });
    expect(component.attributeOptions(structured, 'size')).toEqual(['S']);

    component.selectAttribute(structured, 'size', 'S');
    const selected = component.selectedVariant()!;
    component.addToCart(structured, selected);

    expect(selected.id).toBe('negro-s');
    expect(selected.priceInCents).toBe(1600);
    expect(cart.items()[0]).toEqual(
      expect.objectContaining({
        variantId: 'negro-s',
        unitPriceInCents: 1600,
        variantName: 'Negro · Talle S',
      }),
    );
  });

  it('does not turn a legacy CSV size into multiple purchasable sizes', () => {
    const invalid = makeStructuredProduct();
    invalid.variants = [{
      id: 'legacy-shirt',
      sku: 'REM-BLA',
      name: 'Remera Blanca',
      color: 'Blanco',
      size: 'S,M,L,XL',
      attributes: {},
      priceInCents: 1500,
      availableStock: 4,
    }];

    component.selectAttribute(invalid, 'color', 'Blanco');

    expect(component.structuredAttributeKeys(invalid)).toEqual(['color', 'size']);
    expect(component.attributeOptions(invalid, 'size')).toEqual([]);
    expect(component.selectedVariant()).toBeNull();
    expect(component.emptyAttributeMessage('size')).toBe('Los talles de este producto todavía no están disponibles.');
  });
});

function makeProduct(): PublicProduct {
  return {
    id: 'product-id',
    slug: 'llavero-logo-gatarsis',
    name: 'Llavero logo Gatarsis',
    media: [],
    variants: [
      {
        id: 'white',
        sku: 'SKU-B',
        name: 'Blanco',
        color: 'white',
        size: null,
        priceInCents: 150,
        availableStock: 3,
        media: [{ id: 'white-image', url: 'white.jpg', alt: 'Llavero blanco', sortOrder: 0, isCover: true }],
      },
      {
        id: 'black',
        sku: 'SKU-N',
        name: 'Negro',
        color: 'black',
        size: null,
        priceInCents: 100,
        availableStock: 1,
        media: [{ id: 'black-image', url: 'black.jpg', alt: 'Llavero negro', sortOrder: 0, isCover: true }],
      },
      {
        id: 'lilac',
        sku: 'SKU-L',
        name: 'Lila',
        color: 'lilac',
        size: null,
        priceInCents: 150,
        availableStock: 5,
        media: [{ id: 'lilac-image', url: 'lilac.jpg', alt: 'Llavero lila', sortOrder: 0, isCover: true }],
      },
    ],
  };
}

function makeStructuredProduct(): PublicProduct {
  return {
    id: 'shirt-id',
    slug: 'remera-gatarsis',
    name: 'Remera Gatarsis',
    media: [],
    variants: [
      {
        id: 'blanco-s',
        sku: 'REM-BLA-S',
        name: 'Remera Blanca S',
        color: null,
        size: null,
        attributes: { color: 'Blanco', size: 'S' },
        priceInCents: 1500,
        availableStock: 2,
        media: [{ id: 'blanco-image', url: 'blanco.jpg', alt: 'Remera blanca', sortOrder: 0, isCover: true }],
      },
      {
        id: 'blanco-m',
        sku: 'REM-BLA-M',
        name: 'Remera Blanca M',
        color: null,
        size: null,
        attributes: { color: 'Blanco', size: 'M' },
        priceInCents: 1500,
        availableStock: 0,
      },
      {
        id: 'negro-s',
        sku: 'REM-NEG-S',
        name: 'Remera Negra S',
        color: null,
        size: null,
        attributes: { color: 'Negro', size: 'S' },
        priceInCents: 1600,
        availableStock: 4,
      },
    ],
  };
}
