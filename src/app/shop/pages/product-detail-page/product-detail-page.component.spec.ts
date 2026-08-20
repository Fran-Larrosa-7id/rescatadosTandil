import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
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
