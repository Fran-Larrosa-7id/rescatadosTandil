import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { ADMIN_API_BASE_URL } from '../core/admin-api.config';
import { AdminProductDetail } from '../core/admin.models';
import { AdminProductEditorComponent } from './admin-product-editor.component';

describe('AdminProductEditorComponent ProductMedia UX', () => {
  let fixture: ComponentFixture<AdminProductEditorComponent>;
  let component: AdminProductEditorComponent;
  let http: HttpTestingController;

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
});

function productDetail(): AdminProductDetail {
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
  };
}
