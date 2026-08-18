import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { adminErrorMessage } from '../core/admin-domain-error';
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

interface ProductForm { name: string; slug: string; shortDescription: string; featured: boolean; sortOrder: number; active: boolean; }
interface VariantForm { id: string | null; sku: string; name: string; color: string; size: string; price: string; active: boolean; sortOrder: number; lowStockThreshold: number | null; }
interface MediaForm { id: string | null; url: string; alt: string; sortOrder: number; isCover: boolean; }

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `<div class="page">
    <div class="page-heading"><div><p class="eyebrow">Catálogo</p><h1>{{ id ? 'Editar producto' : 'Nuevo producto' }}</h1></div></div>
    <form (ngSubmit)="save()" #form="ngForm" class="editor">
      <section>
        <h2>Información</h2>
        <label>Nombre<input name="name" required [(ngModel)]="model.name" (ngModelChange)="dirty.set(true)" /></label>
        <label>Slug<input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" [(ngModel)]="model.slug" (ngModelChange)="dirty.set(true)" /></label>
        <label>Descripción corta<textarea name="description" [(ngModel)]="model.shortDescription" (ngModelChange)="dirty.set(true)"></textarea></label>
        <div class="two"><label>Orden<input name="sortOrder" type="number" [(ngModel)]="model.sortOrder" (ngModelChange)="dirty.set(true)" /></label><label class="check"><input name="featured" type="checkbox" [(ngModel)]="model.featured" (ngModelChange)="dirty.set(true)" /> Destacado</label><label class="check"><input name="active" type="checkbox" [(ngModel)]="model.active" (ngModelChange)="dirty.set(true)" /> Activo</label></div>
      </section>
      @if (id) {
        <section>
          <h2>Variantes</h2>
          @if (product()?.variants?.length) { <div class="table-wrap"><table><thead><tr><th>SKU</th><th>Nombre</th><th>Precio</th><th>Orden</th><th>Stock mínimo</th><th></th></tr></thead><tbody>@for (item of product()!.variants; track item.id) { <tr><td>{{ item.sku }}</td><td>{{ item.name }}</td><td>{{ ars(item.priceInCents) }}</td><td>{{ item.sortOrder }}</td><td>{{ item.lowStockThreshold ?? '—' }}</td><td><button type="button" (click)="editVariant(item)">Editar</button></td></tr> }</tbody></table></div> }
          <button type="button" (click)="newVariant()">Agregar variante</button>
          @if (variant()) { <fieldset><legend>{{ variant()!.id ? 'Editar variante' : 'Nueva variante' }}</legend><label>SKU<input [(ngModel)]="variant()!.sku" name="sku" required /></label><label>Nombre<input [(ngModel)]="variant()!.name" name="variantName" required /></label><label>Precio (ARS)<input [(ngModel)]="variant()!.price" name="variantPrice" inputmode="decimal" required /></label><label>Color<input [(ngModel)]="variant()!.color" name="color" /></label><label>Talle<input [(ngModel)]="variant()!.size" name="size" /></label><label>Orden<input [(ngModel)]="variant()!.sortOrder" name="variantSortOrder" type="number" /></label><label>Stock mínimo<input [(ngModel)]="variant()!.lowStockThreshold" name="lowStockThreshold" type="number" min="0" /></label><label class="check"><input [(ngModel)]="variant()!.active" name="variantActive" type="checkbox" /> Activa</label><button type="button" (click)="saveVariant()">Guardar variante</button></fieldset> }
        </section>
        <section>
          <h2>Multimedia</h2><p class="muted">Usá URLs públicas para las imágenes del producto.</p>
          @if (product()?.media?.length) { <div class="table-wrap"><table><thead><tr><th>Vista previa</th><th>Descripción</th><th>Orden</th><th>Portada</th><th></th></tr></thead><tbody>@for (item of product()!.media; track item.id) { <tr><td><img [src]="item.url" [alt]="item.alt" width="56" height="56" /></td><td>{{ item.alt }}</td><td>{{ item.sortOrder }}</td><td>{{ item.isCover ? 'Sí' : '—' }}</td><td><button type="button" (click)="editMedia(item)">Editar</button><button type="button" (click)="deleteMedia(item)">Eliminar</button></td></tr> }</tbody></table></div> }
          <button type="button" (click)="newMedia()">Agregar imagen</button>
          @if (media()) { <fieldset><legend>{{ media()!.id ? 'Editar imagen' : 'Nueva imagen' }}</legend><label>URL<input [(ngModel)]="media()!.url" name="mediaUrl" type="url" required /></label><label>Texto alternativo<input [(ngModel)]="media()!.alt" name="mediaAlt" required /></label><label>Orden<input [(ngModel)]="media()!.sortOrder" name="mediaSortOrder" type="number" /></label><label class="check"><input [(ngModel)]="media()!.isCover" name="mediaCover" type="checkbox" /> Usar como portada</label><button type="button" (click)="saveMedia()">Guardar imagen</button></fieldset> }
        </section>
      }
      <p class="error" aria-live="polite">{{ message() }}</p><button class="button-primary button" [disabled]="form.invalid || saving()">{{ saving() ? 'Guardando…' : 'Guardar producto' }}</button>
    </form>
  </div>`,
  styleUrl: './admin-pages.css',
})
export class AdminProductEditorComponent implements OnInit {
  id: string | null = null;
  readonly dirty = signal(false);
  readonly saving = signal(false);
  readonly message = signal('');
  readonly product = signal<AdminProductDetail | null>(null);
  readonly variant = signal<VariantForm | null>(null);
  readonly media = signal<MediaForm | null>(null);
  model: ProductForm = { name: '', slug: '', shortDescription: '', featured: false, sortOrder: 0, active: true };

  constructor(private readonly api: AdminApiService, private readonly route: ActivatedRoute, private readonly router: Router) {}

  ngOnInit(): void { this.id = this.route.snapshot.paramMap.get('productId'); if (this.id) this.loadProduct(); }
  ars(value: number): string { return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value / 100); }
  canLeave(): boolean { return !this.dirty() || confirm('Hay cambios sin guardar. ¿Querés salir?'); }

  save(): void {
    this.saving.set(true);
    const request = this.id ? this.updateRequest() : this.createRequest();
    const operation = this.id ? this.api.updateProduct(this.id, request as UpdateAdminProductRequest) : this.api.createProduct(request as CreateAdminProductRequest);
    operation.subscribe({ next: (saved) => { this.dirty.set(false); this.message.set('Producto guardado.'); if (!this.id) void this.router.navigate(['/admin/products', saved.id]); else this.setProduct(saved); }, error: (error: unknown) => this.message.set(adminErrorMessage(error, 'No pudimos guardar los cambios.')), complete: () => this.saving.set(false) });
  }

  newVariant(): void { this.variant.set({ id: null, sku: '', name: '', color: '', size: '', price: '', active: true, sortOrder: 0, lowStockThreshold: null }); }
  editVariant(item: AdminProductVariant): void { this.variant.set({ id: item.id, sku: item.sku, name: item.name, color: item.color ?? '', size: item.size ?? '', price: (item.priceInCents / 100).toFixed(2).replace('.', ','), active: item.active, sortOrder: item.sortOrder, lowStockThreshold: item.lowStockThreshold }); }
  saveVariant(): void {
    const draft = this.variant(); if (!this.id || !draft) return;
    const priceInCents = arsToCents(draft.price); if (priceInCents === null || priceInCents < 1) { this.message.set('Ingresá un precio válido.'); return; }
    const body: CreateAdminVariantRequest = { sku: draft.sku, name: draft.name, color: nullable(draft.color), size: nullable(draft.size), priceInCents, active: draft.active, sortOrder: draft.sortOrder, lowStockThreshold: draft.lowStockThreshold };
    const operation = draft.id ? this.api.updateVariant(draft.id, body as UpdateAdminVariantRequest) : this.api.createVariant(this.id, body);
    operation.subscribe({ next: () => { this.variant.set(null); this.message.set('Variante guardada.'); this.loadProduct(); }, error: (error: unknown) => this.message.set(adminErrorMessage(error, 'No pudimos guardar la variante.')) });
  }

  newMedia(): void { this.media.set({ id: null, url: '', alt: '', sortOrder: 0, isCover: false }); }
  editMedia(item: AdminProductMedia): void { this.media.set({ id: item.id, url: item.url, alt: item.alt, sortOrder: item.sortOrder, isCover: item.isCover }); }
  saveMedia(): void {
    const draft = this.media(); if (!this.id || !draft) return;
    const body: CreateAdminProductMediaRequest = { url: draft.url, alt: draft.alt, sortOrder: draft.sortOrder, isCover: draft.isCover };
    const operation = draft.id ? this.api.updateMedia(draft.id, body as UpdateAdminProductMediaRequest) : this.api.createMedia(this.id, body);
    operation.subscribe({ next: () => { this.media.set(null); this.message.set('Imagen guardada.'); this.loadProduct(); }, error: (error: unknown) => this.message.set(adminErrorMessage(error, 'No pudimos guardar la imagen.')) });
  }
  deleteMedia(item: AdminProductMedia): void { if (!confirm(`¿Eliminar la imagen “${item.alt}”?`)) return; this.api.deleteMedia(item.id).subscribe({ next: () => { this.message.set('Imagen eliminada.'); this.loadProduct(); }, error: (error: unknown) => this.message.set(adminErrorMessage(error, 'No pudimos eliminar la imagen.')) }); }

  private loadProduct(): void { if (!this.id) return; this.api.product(this.id).subscribe({ next: (product) => this.setProduct(product), error: (error: unknown) => this.message.set(adminErrorMessage(error, 'No pudimos cargar el producto.')) }); }
  private setProduct(product: AdminProductDetail): void { this.product.set(product); this.model = { name: product.name, slug: product.slug, shortDescription: product.shortDescription ?? '', featured: product.featured, sortOrder: product.sortOrder, active: product.active }; }
  private createRequest(): CreateAdminProductRequest { return { name: this.model.name, slug: this.model.slug, shortDescription: this.model.shortDescription || undefined, active: this.model.active, featured: this.model.featured, sortOrder: this.model.sortOrder }; }
  private updateRequest(): UpdateAdminProductRequest { return { name: this.model.name, slug: this.model.slug, shortDescription: nullable(this.model.shortDescription), active: this.model.active, featured: this.model.featured, sortOrder: this.model.sortOrder }; }
}

function nullable(value: string): string | null { return value.trim() || null; }
function arsToCents(value: string): number | null { const normalized = value.trim().replace(/\./g, '').replace(',', '.'); if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null; const [whole, decimal = ''] = normalized.split('.'); return Number(whole) * 100 + Number((decimal + '00').slice(0, 2)); }
