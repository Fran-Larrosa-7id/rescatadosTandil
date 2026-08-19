import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { adminErrorMessage } from '../core/admin-domain-error';
import { AdminFeedback, AdminFeedbackKind } from '../core/admin-feedback';
import { AdminApiService } from '../core/admin-api.service';
import {
  AdminProductDetail,
  AdminProductMedia,
  AdminProductVariant,
  CreateAdminProductMediaRequest,
  CreateAdminProductRequest,
  CreateAdminVariantRequest,
  UpdateAdminProductMediaRequest,
  UpdateAdminProductRequest,
  UpdateAdminVariantRequest,
} from '../core/admin.models';
import { formatArsFromCents } from '../core/admin-formatters';

interface ProductForm {
  name: string;
  slug: string;
  shortDescription: string;
  featured: boolean;
  sortOrder: number;
  active: boolean;
}

interface VariantForm {
  id: string | null;
  sku: string;
  name: string;
  color: string;
  size: string;
  price: string;
  active: boolean;
  sortOrder: number;
  lowStockThreshold: number | null;
}

interface MediaForm {
  id: string | null;
  url: string;
  alt: string;
  sortOrder: number;
  isCover: boolean;
}

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="page product-editor">
      <nav class="breadcrumb">
        <a routerLink="/admin/products">Productos</a>
        <span>/</span>
        <span>{{ id ? model.name || 'Editar producto' : 'Nuevo producto' }}</span>
      </nav>

      <header class="page-heading">
        <div>
          <p class="eyebrow">Catálogo</p>
          <h1>{{ id ? 'Editar producto' : 'Nuevo producto' }}</h1>
          <p class="page-description">
            {{
              id
                ? model.name
                : 'Creá la información base antes de administrar variantes e imágenes.'
            }}
          </p>
        </div>
        <span class="status-mark self-start" [class.is-muted]="!model.active">
          {{ model.active ? 'Activo' : 'Inactivo' }}
        </span>
      </header>

      @if (notice()) {
        <p class="feedback" [class]="'feedback ' + notice()!.kind" aria-live="polite">
          {{ notice()!.message }}
        </p>
      }

      <form #form="ngForm" class="editor" (ngSubmit)="saveProduct()">
        <section class="editor-section">
          <div class="section-heading">
            <h2>Información</h2>
            <p>Datos visibles del producto en el catálogo.</p>
          </div>
          <div class="form-grid">
            <label>Nombre<input name="name" required [(ngModel)]="model.name" (ngModelChange)="markDirty()" /></label>
            <label>Slug<input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" [(ngModel)]="model.slug" (ngModelChange)="markDirty()" /></label>
            <label class="wide">Descripción corta<textarea name="description" [(ngModel)]="model.shortDescription" (ngModelChange)="markDirty()"></textarea></label>
            <label>Orden<input name="sortOrder" type="number" [(ngModel)]="model.sortOrder" (ngModelChange)="markDirty()" /></label>
            <div class="toggle-row">
              <label class="check"><input name="featured" type="checkbox" [(ngModel)]="model.featured" (ngModelChange)="markDirty()" /> Destacado</label>
              <label class="check"><input name="active" type="checkbox" [(ngModel)]="model.active" (ngModelChange)="markDirty()" /> Activo</label>
            </div>
          </div>
          <div class="section-actions">
            <button class="button button-primary" [disabled]="form.invalid || saving()">
              {{ saving() ? 'Guardando...' : 'Guardar información' }}
            </button>
          </div>
        </section>
      </form>

      @if (id) {
        <section class="editor-section">
          <div class="section-heading inline-heading">
            <div>
              <h2>Variantes</h2>
              <p>SKU, precio y atributos de venta.</p>
            </div>
            <button type="button" class="button button-secondary" (click)="newVariant()">Agregar variante</button>
          </div>
          @if (product()?.variants?.length) {
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Variante</th>
                    <th>SKU</th>
                    <th>Precio</th>
                    <th>Color / Talle</th>
                    <th>Stock mínimo</th>
                    <th>Estado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  @for (item of product()!.variants; track item.id) {
                    <tr>
                      <td>{{ item.name }}</td>
                      <td><code>{{ item.sku }}</code></td>
                      <td>{{ ars(item.priceInCents) }}</td>
                      <td>{{ item.color || '—' }} / {{ item.size || '—' }}</td>
                      <td>{{ item.lowStockThreshold ?? '—' }}</td>
                      <td>{{ item.active ? 'Activa' : 'Inactiva' }}</td>
                      <td><button type="button" class="action-button" (click)="editVariant(item)">Editar</button></td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          } @else {
            <p class="empty compact">Todavía no hay variantes.</p>
          }
        </section>

        <section class="editor-section">
          <div class="section-heading inline-heading">
            <div>
              <h2>Imágenes</h2>
              <p>Usá URLs públicas y descripciones claras.</p>
            </div>
            <button type="button" class="button button-secondary" (click)="newMedia()">Agregar imagen</button>
          </div>
          @if (product()?.media?.length) {
            <div class="media-grid">
              @for (item of product()!.media; track item.id) {
                <article class="media-card">
                  <div class="media-preview">
                    @if (failedImages().has(item.id)) {
                      <span>No se pudo cargar la imagen.</span>
                    } @else {
                      <img [src]="item.url" [alt]="item.alt" (error)="markImageFailed(item.id)" />
                    }
                  </div>
                  <div class="media-copy">
                    <strong>{{ item.alt }}</strong>
                    <span>Orden {{ item.sortOrder }}</span>
                    @if (item.isCover) {
                      <span class="cover-label">Portada</span>
                    }
                  </div>
                  <div class="media-actions">
                    <button type="button" (click)="editMedia(item)">Editar</button>
                    <button type="button" class="danger-action" (click)="deleteMedia(item)">Eliminar</button>
                  </div>
                </article>
              }
            </div>
          } @else {
            <p class="empty compact">Todavía no hay imágenes.</p>
          }
        </section>
      }

      @if (variant()) {
        <div class="dialog-backdrop">
          <form class="dialog wide-dialog" (ngSubmit)="saveVariant()">
            <header>
              <h2>{{ variant()!.id ? 'Editar variante' : 'Nueva variante' }}</h2>
              <button type="button" class="close-button" (click)="variant.set(null)" aria-label="Cerrar">×</button>
            </header>
            <div class="form-grid">
              <label>Nombre<input [(ngModel)]="variant()!.name" name="variantName" required /></label>
              <label>SKU<input [(ngModel)]="variant()!.sku" name="sku" required /></label>
              <label>Precio (ARS)<input [(ngModel)]="variant()!.price" name="variantPrice" inputmode="decimal" required /></label>
              <label>Stock mínimo<input [(ngModel)]="variant()!.lowStockThreshold" name="lowStockThreshold" type="number" min="0" /></label>
              <label>Color<input [(ngModel)]="variant()!.color" name="color" /></label>
              <label>Talle<input [(ngModel)]="variant()!.size" name="size" /></label>
              <label>Orden<input [(ngModel)]="variant()!.sortOrder" name="variantSortOrder" type="number" /></label>
              <label class="check align-end"><input [(ngModel)]="variant()!.active" name="variantActive" type="checkbox" /> Activa</label>
            </div>
            <div class="actions">
              <button type="button" class="button button-quiet" (click)="variant.set(null)">Cancelar</button>
              <button class="button button-primary">Guardar variante</button>
            </div>
          </form>
        </div>
      }

      @if (media()) {
        <div class="dialog-backdrop">
          <form class="dialog wide-dialog" (ngSubmit)="saveMedia()">
            <header>
              <h2>{{ media()!.id ? 'Editar imagen' : 'Nueva imagen' }}</h2>
              <button type="button" class="close-button" (click)="media.set(null)" aria-label="Cerrar">×</button>
            </header>
            <div class="media-form">
              <div class="form-grid">
                <label class="wide">URL<input [(ngModel)]="media()!.url" name="mediaUrl" type="url" required /></label>
                <label class="wide">
                  Descripción de la imagen
                  <input
                    [(ngModel)]="media()!.alt"
                    name="mediaDescription"
                    required
                    placeholder="Taza Gatarsis color lila con logo blanco"
                  />
                  <small>Describe brevemente lo que aparece en la foto. Se usa para accesibilidad si la imagen no puede verse.</small>
                </label>
                <label>Orden<input [(ngModel)]="media()!.sortOrder" name="mediaSortOrder" type="number" /></label>
                <label class="check align-end"><input [(ngModel)]="media()!.isCover" name="mediaCover" type="checkbox" /> Usar como portada</label>
              </div>
              <div class="media-preview draft">
                @if (media()!.url) {
                  <img [src]="media()!.url" [alt]="media()!.alt || 'Vista previa de imagen'" (error)="draftImageFailed.set(true)" />
                }
                @if (draftImageFailed()) {
                  <span>No se pudo cargar la imagen.</span>
                }
              </div>
            </div>
            @if (mediaError()) {
              <p class="feedback error" aria-live="polite">{{ mediaError() }}</p>
            }
            <div class="actions">
              <button type="button" class="button button-quiet" (click)="media.set(null)">Cancelar</button>
              <button class="button button-primary" [disabled]="mediaInvalid()">Guardar imagen</button>
            </div>
          </form>
        </div>
      }
    </div>
  `,
  styleUrl: './admin-pages.css',
})
export class AdminProductEditorComponent implements OnInit {
  id: string | null = null;
  readonly dirty = signal(false);
  readonly saving = signal(false);
  readonly product = signal<AdminProductDetail | null>(null);
  readonly variant = signal<VariantForm | null>(null);
  readonly media = signal<MediaForm | null>(null);
  readonly notice = signal<AdminFeedback | null>(null);
  readonly mediaError = signal('');
  readonly failedImages = signal(new Set<string>());
  readonly draftImageFailed = signal(false);
  model: ProductForm = {
    name: '',
    slug: '',
    shortDescription: '',
    featured: false,
    sortOrder: 0,
    active: true,
  };

  constructor(
    private readonly api: AdminApiService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('productId');
    if (this.id) this.loadProduct();
  }

  ars(value: number): string {
    return formatArsFromCents(value);
  }

  markDirty(): void {
    this.dirty.set(true);
  }

  canLeave(): boolean {
    return !this.dirty() || confirm('Hay cambios sin guardar. ¿Querés salir?');
  }

  saveProduct(): void {
    this.saving.set(true);
    const request = this.id ? this.updateRequest() : this.createRequest();
    const operation = this.id
      ? this.api.updateProduct(this.id, request as UpdateAdminProductRequest)
      : this.api.createProduct(request as CreateAdminProductRequest);
    operation.subscribe({
      next: (saved) => {
        const isNew = !this.id;
        this.id = saved.id;
        this.dirty.set(false);
        this.feedback('success', isNew ? 'Producto creado.' : 'Producto actualizado.');
        if (isNew) void this.router.navigate(['/admin/products', saved.id]);
        this.loadProduct();
      },
      error: (error: unknown) => {
        this.feedback('error', adminErrorMessage(error, 'No pudimos guardar los cambios.'));
        this.saving.set(false);
      },
      complete: () => this.saving.set(false),
    });
  }

  newVariant(): void {
    this.variant.set({
      id: null,
      sku: '',
      name: '',
      color: '',
      size: '',
      price: '',
      active: true,
      sortOrder: 0,
      lowStockThreshold: null,
    });
  }

  editVariant(item: AdminProductVariant): void {
    this.variant.set({
      id: item.id,
      sku: item.sku,
      name: item.name,
      color: item.color ?? '',
      size: item.size ?? '',
      price: (item.priceInCents / 100).toFixed(2).replace('.', ','),
      active: item.active,
      sortOrder: item.sortOrder,
      lowStockThreshold: item.lowStockThreshold,
    });
  }

  saveVariant(): void {
    const draft = this.variant();
    if (!this.id || !draft) return;
    const priceInCents = arsToCents(draft.price);
    if (priceInCents === null || priceInCents < 1) {
      this.feedback('error', 'Ingresá un precio válido.');
      return;
    }
    const body: CreateAdminVariantRequest = {
      sku: draft.sku,
      name: draft.name,
      color: nullable(draft.color),
      size: nullable(draft.size),
      priceInCents,
      active: draft.active,
      sortOrder: draft.sortOrder,
      lowStockThreshold: draft.lowStockThreshold,
    };
    const operation = draft.id
      ? this.api.updateVariant(draft.id, body as UpdateAdminVariantRequest)
      : this.api.createVariant(this.id, body);
    operation.subscribe({
      next: () => {
        this.variant.set(null);
        this.feedback('success', draft.id ? 'Variante actualizada.' : 'Variante creada.');
        this.loadProduct();
      },
      error: (error: unknown) =>
        this.feedback('error', adminErrorMessage(error, 'No pudimos guardar la variante.')),
    });
  }

  newMedia(): void {
    this.draftImageFailed.set(false);
    this.mediaError.set('');
    this.media.set({ id: null, url: '', alt: '', sortOrder: 0, isCover: false });
  }

  editMedia(item: AdminProductMedia): void {
    this.draftImageFailed.set(false);
    this.mediaError.set('');
    this.media.set({
      id: item.id,
      url: item.url,
      alt: item.alt,
      sortOrder: item.sortOrder,
      isCover: item.isCover,
    });
  }

  mediaInvalid(): boolean {
    const draft = this.media();
    return !draft || !draft.url.trim() || draft.alt.trim().length < 1;
  }

  saveMedia(): void {
    const draft = this.media();
    if (!this.id || !draft) return;
    this.mediaError.set('');
    if (draft.alt.trim().length < 1) {
      this.mediaError.set('Ingresá una descripción de la imagen.');
      return;
    }
    if (!draft.url.trim()) {
      this.mediaError.set('Ingresá una URL válida para la imagen.');
      return;
    }
    const body: CreateAdminProductMediaRequest = {
      url: draft.url.trim(),
      alt: draft.alt.trim(),
      sortOrder: draft.sortOrder,
      isCover: draft.isCover,
    };
    const operation = draft.id
      ? this.api.updateMedia(draft.id, body as UpdateAdminProductMediaRequest)
      : this.api.createMedia(this.id, body);
    operation.subscribe({
      next: () => {
        this.media.set(null);
        this.mediaError.set('');
        this.feedback('success', draft.id ? 'Imagen actualizada.' : 'Imagen agregada.');
        this.loadProduct();
      },
      error: (error: unknown) => this.mediaError.set(mediaErrorMessage(error)),
    });
  }

  deleteMedia(item: AdminProductMedia): void {
    if (!confirm(`¿Eliminar esta imagen?\n\nSe quitará del producto, pero no modifica el archivo original.`)) {
      return;
    }
    this.api.deleteMedia(item.id).subscribe({
      next: () => {
        this.feedback('success', 'Imagen eliminada.');
        this.loadProduct();
      },
      error: (error: unknown) =>
        this.feedback('error', adminErrorMessage(error, 'No pudimos eliminar la imagen.')),
    });
  }

  markImageFailed(id: string): void {
    this.failedImages.update((items) => new Set([...items, id]));
  }

  private feedback(kind: AdminFeedbackKind, message: string): void {
    this.notice.set({ kind, message });
  }

  private loadProduct(): void {
    if (!this.id) return;
    this.api.product(this.id).subscribe({
      next: (product) => this.setProduct(product),
      error: (error: unknown) =>
        this.feedback('error', adminErrorMessage(error, 'No pudimos cargar el producto.')),
    });
  }

  private setProduct(product: AdminProductDetail): void {
    this.product.set(product);
    this.model = {
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription ?? '',
      featured: product.featured,
      sortOrder: product.sortOrder,
      active: product.active,
    };
  }

  private createRequest(): CreateAdminProductRequest {
    return {
      name: this.model.name,
      slug: this.model.slug,
      shortDescription: this.model.shortDescription || undefined,
      active: this.model.active,
      featured: this.model.featured,
      sortOrder: this.model.sortOrder,
    };
  }

  private updateRequest(): UpdateAdminProductRequest {
    return {
      name: this.model.name,
      slug: this.model.slug,
      shortDescription: nullable(this.model.shortDescription),
      active: this.model.active,
      featured: this.model.featured,
      sortOrder: this.model.sortOrder,
    };
  }
}

function nullable(value: string): string | null {
  return value.trim() || null;
}

function arsToCents(value: string): number | null {
  const normalized = value.trim().replace(/\./g, '').replace(',', '.');
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;
  const [whole, decimal = ''] = normalized.split('.');
  return Number(whole) * 100 + Number((decimal + '00').slice(0, 2));
}

function mediaErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (typeof error.error === 'string' && error.error.trim()) return error.error;
    if (typeof error.error?.message === 'string' && error.error.message.trim()) {
      return error.error.message;
    }
  }
  return 'No pudimos guardar la imagen.';
}
