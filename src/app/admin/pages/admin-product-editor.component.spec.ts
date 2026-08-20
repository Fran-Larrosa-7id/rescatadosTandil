import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { ADMIN_API_BASE_URL } from '../core/admin-api.config';
import { AdminProductDetail } from '../core/admin.models';
import { AdminProductEditorComponent } from './admin-product-editor.component';

describe('AdminProductEditorComponent ProductMedia UX', () => {
  let fixture: ComponentFixture<AdminProductEditorComponent>;
  let component: AdminProductEditorComponent;
  let http: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductEditorComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map() } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProductEditorComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fixture.detectChanges();
    component.id = 'product-id';
  });

  afterEach(() => http.verify());

  it('does not request media creation when the URL is valid but description is empty', () => {
    component.media.set({ id: null, url: 'https://cdn.test/taza.jpg', alt: '', sortOrder: 0, isCover: false });

    component.saveMedia();

    expect(component.mediaError()).toBe('Ingresá una descripción de la imagen.');
    http.expectNone(`${ADMIN_API_BASE_URL}/products/product-id/media`);
  });

  it('does not request media creation when description contains only spaces', () => {
    component.media.set({ id: null, url: 'https://cdn.test/taza.jpg', alt: '   ', sortOrder: 0, isCover: false });

    component.saveMedia();

    expect(component.mediaError()).toBe('Ingresá una descripción de la imagen.');
    http.expectNone(`${ADMIN_API_BASE_URL}/products/product-id/media`);
  });

  it('posts media with the real contract when URL and description are valid', () => {
    component.media.set({
      id: null,
      url: 'https://cdn.test/taza.jpg',
      alt: 'Taza Gatarsis color lila con logo blanco',
      sortOrder: 2,
      isCover: true,
    });

    component.saveMedia();

    const request = http.expectOne(`${ADMIN_API_BASE_URL}/products/product-id/media`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      url: 'https://cdn.test/taza.jpg',
      alt: 'Taza Gatarsis color lila con logo blanco',
      sortOrder: 2,
      isCover: true,
    });
    request.flush({
      id: 'media-id',
      productId: 'product-id',
      url: 'https://cdn.test/taza.jpg',
      alt: 'Taza Gatarsis color lila con logo blanco',
      sortOrder: 2,
      isCover: true,
      createdAt: '2026-01-01T00:00:00Z',
    });
    http.expectOne(`${ADMIN_API_BASE_URL}/products/product-id`).flush(productDetail());
  });

  it('sends the media description trimmed in the alt contract field', () => {
    component.media.set({
      id: null,
      url: 'https://cdn.test/taza.jpg',
      alt: '  Taza Gatarsis color lila con logo blanco  ',
      sortOrder: 2,
      isCover: true,
    });

    component.saveMedia();

    const request = http.expectOne(`${ADMIN_API_BASE_URL}/products/product-id/media`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      url: 'https://cdn.test/taza.jpg',
      alt: 'Taza Gatarsis color lila con logo blanco',
      sortOrder: 2,
      isCover: true,
    });
    request.flush({
      id: 'media-id',
      productId: 'product-id',
      url: 'https://cdn.test/taza.jpg',
      alt: 'Taza Gatarsis color lila con logo blanco',
      sortOrder: 2,
      isCover: true,
      createdAt: '2026-01-01T00:00:00Z',
    });
    http.expectOne(`${ADMIN_API_BASE_URL}/products/product-id`).flush(productDetail());
  });

  it('shows backend validation errors inside the media form', () => {
    component.media.set({
      id: null,
      url: 'https://cdn.test/taza.jpg',
      alt: 'Taza Gatarsis color lila con logo blanco',
      sortOrder: 0,
      isCover: false,
    });

    component.saveMedia();

    const request = http.expectOne(`${ADMIN_API_BASE_URL}/products/product-id/media`);
    request.flush(
      { message: 'alt must be longer than or equal to 1 characters' },
      { status: 400, statusText: 'Bad Request' },
    );
    expect(component.mediaError()).toBe('alt must be longer than or equal to 1 characters');
    expect(component.notice()).toBeNull();
  });

  it('does not create a new product when initial image URL is valid but description is empty', () => {
    component.id = null;
    component.model = validProductForm();
    component.initialMedia.set({
      id: null,
      url: 'https://cdn.test/taza.jpg',
      alt: '',
      sortOrder: 0,
      isCover: true,
    });

    component.saveProduct();

    expect(component.initialMediaError()).toBe('Ingresá una descripción de la imagen.');
    http.expectNone(`${ADMIN_API_BASE_URL}/products`);
  });

  it('does not create a new product when initial image description contains only spaces', () => {
    component.id = null;
    component.model = validProductForm();
    component.initialMedia.set({
      id: null,
      url: 'https://cdn.test/taza.jpg',
      alt: '   ',
      sortOrder: 0,
      isCover: true,
    });

    component.saveProduct();

    expect(component.initialMediaError()).toBe('Ingresá una descripción de la imagen.');
    http.expectNone(`${ADMIN_API_BASE_URL}/products`);
  });

  it('creates a product and then posts the initial image with the real media contract', () => {
    component.id = null;
    component.model = validProductForm();
    component.initialMedia.set({
      id: null,
      url: 'https://cdn.test/taza.jpg',
      alt: 'Taza Gatarsis color lila con logo blanco',
      sortOrder: 3,
      isCover: true,
    });

    component.saveProduct();

    const productRequest = http.expectOne(`${ADMIN_API_BASE_URL}/products`);
    expect(productRequest.request.method).toBe('POST');
    productRequest.flush(productDetail());

    const mediaRequest = http.expectOne(`${ADMIN_API_BASE_URL}/products/product-id/media`);
    expect(mediaRequest.request.method).toBe('POST');
    expect(mediaRequest.request.body).toEqual({
      url: 'https://cdn.test/taza.jpg',
      alt: 'Taza Gatarsis color lila con logo blanco',
      sortOrder: 3,
      isCover: true,
    });
    mediaRequest.flush({
      id: 'media-id',
      productId: 'product-id',
      url: 'https://cdn.test/taza.jpg',
      alt: 'Taza Gatarsis color lila con logo blanco',
      sortOrder: 3,
      isCover: true,
      createdAt: '2026-01-01T00:00:00Z',
    });
    http.expectOne(`${ADMIN_API_BASE_URL}/products/product-id`).flush(productDetail());
  });

  it('sends the initial image description trimmed in the alt contract field', () => {
    component.id = null;
    component.model = validProductForm();
    component.initialMedia.set({
      id: null,
      url: 'https://cdn.test/taza.jpg',
      alt: '  Taza Gatarsis color lila con logo blanco  ',
      sortOrder: 3,
      isCover: true,
    });

    component.saveProduct();

    http.expectOne(`${ADMIN_API_BASE_URL}/products`).flush(productDetail());
    const mediaRequest = http.expectOne(`${ADMIN_API_BASE_URL}/products/product-id/media`);
    expect(mediaRequest.request.body).toEqual({
      url: 'https://cdn.test/taza.jpg',
      alt: 'Taza Gatarsis color lila con logo blanco',
      sortOrder: 3,
      isCover: true,
    });
    mediaRequest.flush({
      id: 'media-id',
      productId: 'product-id',
      url: 'https://cdn.test/taza.jpg',
      alt: 'Taza Gatarsis color lila con logo blanco',
      sortOrder: 3,
      isCover: true,
      createdAt: '2026-01-01T00:00:00Z',
    });
    http.expectOne(`${ADMIN_API_BASE_URL}/products/product-id`).flush(productDetail());
  });

  it('keeps product media section scoped to general media only', () => {
    component.product.set(
      productDetail({
        media: [
          {
            id: 'general-media',
            productId: 'product-id',
            variantId: null,
            url: 'https://cdn.test/general.jpg',
            alt: 'General',
            sortOrder: 0,
            isCover: true,
            createdAt: '2026-01-01T00:00:00Z',
          },
          {
            id: 'variant-media',
            productId: 'product-id',
            variantId: 'variant-id',
            url: 'https://cdn.test/variant.jpg',
            alt: 'Variante',
            sortOrder: 0,
            isCover: true,
            createdAt: '2026-01-01T00:00:00Z',
          },
        ],
      }),
    );

    expect(component.generalMedia().map((item) => item.id)).toEqual(['general-media']);
    expect(component.variantMedia('variant-id').map((item) => item.id)).toEqual(['variant-media']);
  });

  it('creates variant media with the current variant id and no manual UUID field', () => {
    component.media.set({
      id: null,
      variantId: 'variant-id',
      url: 'https://cdn.test/lila.jpg',
      alt: 'Llavero Gatarsis color lila',
      sortOrder: 1,
      isCover: true,
    });

    component.saveMedia();

    const request = http.expectOne(`${ADMIN_API_BASE_URL}/products/product-id/media`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      url: 'https://cdn.test/lila.jpg',
      alt: 'Llavero Gatarsis color lila',
      sortOrder: 1,
      isCover: true,
      variantId: 'variant-id',
    });
    request.flush({
      id: 'media-id',
      productId: 'product-id',
      variantId: 'variant-id',
      url: 'https://cdn.test/lila.jpg',
      alt: 'Llavero Gatarsis color lila',
      sortOrder: 1,
      isCover: true,
      createdAt: '2026-01-01T00:00:00Z',
    });
    http.expectOne(`${ADMIN_API_BASE_URL}/products/product-id`).flush(productDetail());
  });

  it('creates a variant with initialStock and keeps low stock threshold separate', () => {
    component.newVariant();
    component.variant.update((draft) => ({
      ...draft!, name: 'Talle M', sku: 'SKU-M', price: '1500', lowStockThreshold: 2, initialStock: 10,
    }));

    component.saveVariant();

    const request = http.expectOne(`${ADMIN_API_BASE_URL}/products/product-id/variants`);
    expect(request.request.body).toEqual({
      name: 'Talle M', sku: 'SKU-M', priceInCents: 150000, color: null, size: null,
      sortOrder: 0, lowStockThreshold: 2, active: true, initialStock: 10,
    });
    request.flush({ id: 'variant-id', productId: 'product-id', sku: 'SKU-M', name: 'Talle M', color: null, size: null, priceInCents: 150000, active: true, sortOrder: 0, lowStockThreshold: 2, createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' });
    http.expectOne(`${ADMIN_API_BASE_URL}/products/product-id`).flush(productDetail());
  });

  it('does not create a variant with a negative or fractional initial stock', () => {
    component.newVariant();
    component.variant.update((draft) => ({ ...draft!, name: 'Talle M', sku: 'SKU-M', price: '1500', initialStock: -1 }));
    component.saveVariant();
    expect(component.notice()?.message).toBe('Ingresá un stock inicial entero igual o mayor a cero.');
    http.expectNone(`${ADMIN_API_BASE_URL}/products/product-id/variants`);

    component.variant.update((draft) => ({ ...draft!, initialStock: 1.5 }));
    component.saveVariant();
    http.expectNone(`${ADMIN_API_BASE_URL}/products/product-id/variants`);
  });

  it('never sends initialStock when editing an existing variant', () => {
    component.editVariant({
      id: 'variant-id', productId: 'product-id', sku: 'SKU-M', name: 'Talle M', color: null, size: null,
      priceInCents: 150000, active: true, sortOrder: 0, lowStockThreshold: 2,
      createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
    });
    component.saveVariant();
    const request = http.expectOne(`${ADMIN_API_BASE_URL}/variants/variant-id`);
    expect(request.request.body).not.toHaveProperty('initialStock');
    request.flush({ id: 'variant-id', productId: 'product-id', sku: 'SKU-M', name: 'Talle M', color: null, size: null, priceInCents: 150000, active: true, sortOrder: 0, lowStockThreshold: 2, createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' });
    http.expectOne(`${ADMIN_API_BASE_URL}/products/product-id`).flush(productDetail());
  });
});

function validProductForm() {
  return {
    name: 'Producto',
    slug: 'producto',
    shortDescription: '',
    featured: false,
    sortOrder: 0,
    active: true,
  };
}

function productDetail(partial: Partial<AdminProductDetail> = {}): AdminProductDetail {
  return {
    id: 'product-id',
    name: 'Producto',
    slug: 'producto',
    shortDescription: null,
    featured: false,
    sortOrder: 0,
    active: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    variants: [],
    media: [],
    ...partial,
  };
}
