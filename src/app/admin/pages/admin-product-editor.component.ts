import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from '../core/admin-api.service';
import { Product, Variant } from '../core/admin.models';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `<div class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">Catálogo</p>
        <h1>{{ id ? 'Editar producto' : 'Nuevo producto' }}</h1>
      </div>
    </div>
    <form (ngSubmit)="save()" #form="ngForm" class="editor">
      <section>
        <h2>Información</h2>
        <label
          >Nombre<input
            name="name"
            required
            [(ngModel)]="model.name"
            (ngModelChange)="dirty.set(true)" /></label
        ><label
          >Slug<input
            name="slug"
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            [(ngModel)]="model.slug"
            (ngModelChange)="dirty.set(true)" /></label
        ><label
          >Descripción corta<textarea
            name="description"
            [(ngModel)]="model.shortDescription"
            (ngModelChange)="dirty.set(true)"
          ></textarea>
        </label>
        <div class="two">
          <label>Orden<input name="sortOrder" type="number" [(ngModel)]="model.sortOrder" /></label
          ><label class="check"
            ><input name="featured" type="checkbox" [(ngModel)]="model.featured" /> Destacado</label
          ><label class="check"
            ><input name="active" type="checkbox" [(ngModel)]="model.active" /> Activo</label
          >
        </div>
      </section>
      @if (id) {
        <section>
          <h2>Variantes</h2>
          @if (model.variants?.length) {
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  @for (v of model.variants; track v.id) {
                    <tr>
                      <td>{{ v.sku }}</td>
                      <td>{{ v.name }}</td>
                      <td>{{ ars(v.priceInCents) }}</td>
                      <td>{{ v.availableStock ?? '—' }}</td>
                      <td><button type="button" (click)="editVariant(v)">Editar</button></td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
          <button type="button" (click)="newVariant()">Agregar variante</button>
          @if (variant()) {
            <fieldset>
              <legend>{{ variant()!.id ? 'Editar variante' : 'Nueva variante' }}</legend>
              <label>SKU<input [(ngModel)]="variant()!.sku" name="sku" required /></label
              ><label
                >Nombre<input [(ngModel)]="variant()!.name" name="variantName" required /></label
              ><label
                >Precio (ARS)<input
                  [(ngModel)]="variantPrice"
                  name="variantPrice"
                  inputmode="decimal"
                  required /></label
              ><label>Color<input [(ngModel)]="variant()!.color" name="color" /></label
              ><label>Talle<input [(ngModel)]="variant()!.size" name="size" /></label
              ><label class="check"
                ><input [(ngModel)]="variant()!.active" name="variantActive" type="checkbox" />
                Activa</label
              ><button type="button" (click)="saveVariant()">Guardar variante</button>
            </fieldset>
          }
        </section>
      }
      <p class="error" aria-live="polite">{{ message() }}</p>
      <button class="button-primary button" [disabled]="form.invalid || saving()">
        {{ saving() ? 'Guardando…' : 'Guardar producto' }}
      </button>
    </form>
  </div>`,
  styleUrl: './admin-pages.css',
})
export class AdminProductEditorComponent implements OnInit {
  id: string | null = null;
  readonly dirty = signal(false);
  readonly saving = signal(false);
  readonly message = signal('');
  readonly variant = signal<Partial<Variant> | null>(null);
  variantPrice = '';
  model: Partial<Product> = {
    name: '',
    slug: '',
    shortDescription: '',
    featured: false,
    sortOrder: 0,
    active: true,
    variants: [],
  };
  constructor(
    private api: AdminApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('productId');
    if (this.id)
      this.api
        .product(this.id)
        .subscribe({
          next: (p) => (this.model = p),
          error: () => this.message.set('No pudimos cargar el producto.'),
        });
  }
  ars(v: number) {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(v / 100);
  }
  canLeave() {
    return !this.dirty() || confirm('Hay cambios sin guardar. ¿Querés salir?');
  }
  save() {
    this.saving.set(true);
    const op = this.id
      ? this.api.updateProduct(this.id, this.model)
      : this.api.createProduct(this.model);
    op.subscribe({
      next: (p) => {
        this.dirty.set(false);
        this.message.set('Producto guardado.');
        if (!this.id) void this.router.navigate(['/admin/products', p.id]);
      },
      error: (e) => this.message.set(errorMessage(e)),
      complete: () => this.saving.set(false),
    });
  }
  newVariant() {
    this.variant.set({ sku: '', name: '', color: '', size: '', active: true });
    this.variantPrice = '';
  }
  editVariant(v: Variant) {
    this.variant.set({ ...v });
    this.variantPrice = (v.priceInCents / 100).toFixed(2).replace('.', ',');
  }
  saveVariant() {
    if (!this.id || !this.variant()) return;
    const cents = arsToCents(this.variantPrice);
    if (cents === null) {
      this.message.set('Ingresá un precio válido.');
      return;
    }
    const data = { ...this.variant(), priceInCents: cents };
    const op = data.id
      ? this.api.updateVariant(data.id, data)
      : this.api.createVariant(this.id, data);
    op.subscribe({
      next: () => {
        this.variant.set(null);
        this.api.product(this.id!).subscribe((p) => (this.model = p));
        this.message.set('Variante guardada.');
      },
      error: (e) => this.message.set(errorMessage(e)),
    });
  }
}
function arsToCents(value: string) {
  const normalized = value.trim().replace(/\./g, '').replace(',', '.');
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;
  const [whole, decimal = ''] = normalized.split('.');
  return Number(whole) * 100 + Number((decimal + '00').slice(0, 2));
}
function errorMessage(e: any) {
  const code = e?.error?.code;
  return code === 'PRODUCT_SLUG_CONFLICT'
    ? 'Ya existe un producto con ese slug.'
    : code === 'SKU_ALREADY_EXISTS'
      ? 'Ya existe una variante con ese SKU.'
      : 'No pudimos guardar los cambios.';
}
