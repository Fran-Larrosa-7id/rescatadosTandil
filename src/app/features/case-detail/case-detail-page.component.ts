import { DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { DONATION_CONFIG } from '../../core/config/donation.config';
import { SITE_CONFIG } from '../../core/config/site.config';
import { RescueCasesService } from '../../core/services/rescue-cases.service';
import { formatDateNumeric } from '../../core/utils/format-date';
import { AppFooterComponent } from '../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { CaseGalleryComponent } from '../../shared/components/case-gallery/case-gallery.component';
import { CurrentNeedsComponent } from '../../shared/components/current-needs/current-needs.component';
import { DonationCardComponent } from '../../shared/components/donation-card/donation-card.component';
import { CopyAliasButtonComponent } from '../../shared/components/copy-alias-button/copy-alias-button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ShareButtonComponent } from '../../shared/components/share-button/share-button.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { UpdatesTimelineComponent } from '../../shared/components/updates-timeline/updates-timeline.component';

@Component({
  selector: 'app-case-detail-page',
  imports: [
    RouterLink,
    AppHeaderComponent,
    AppFooterComponent,
    CaseGalleryComponent,
    CurrentNeedsComponent,
    DonationCardComponent,
    CopyAliasButtonComponent,
    IconComponent,
    ShareButtonComponent,
    StatusBadgeComponent,
    UpdatesTimelineComponent
  ],
  template: `
    <app-header />

    <main id="contenido" class="pb-28 md:pb-0">
      @if (caseData(); as item) {
        <section class="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-12 lg:px-8">
          <a
            routerLink="/casos"
            class="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
          >
            <app-icon name="arrow" class="size-4 rotate-180" />
            Casos
          </a>

          <div class="mt-6 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <div>
              <div class="mb-6">
                <app-status-badge [status]="item.status" />
                <h1 class="mt-5 text-5xl font-black leading-tight">{{ item.name }}</h1>
                <p class="mt-4 max-w-3xl text-lg text-[var(--color-text-muted)]">{{ item.summary }}</p>
                @if (item.updatedAt) {
                  <p class="mt-4 text-sm text-[var(--color-text-muted)]">
                    Actualizado el {{ formatDate(item.updatedAt) }}
                  </p>
                }
              </div>

              <app-case-gallery [cover]="item.coverImage" [gallery]="item.gallery" />

              <nav
                aria-label="Navegacion del caso"
                class="mt-8 overflow-x-auto border-b border-[var(--color-border)]"
              >
                <div class="flex w-max min-w-full gap-6 text-sm font-bold text-[var(--color-text-muted)]">
                  <button
                    type="button"
                    class="border-b-2 border-transparent px-1 py-3 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    (click)="scrollToSection('historia')"
                  >
                    Historia
                  </button>
                  <button
                    type="button"
                    class="border-b-2 border-transparent px-1 py-3 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    (click)="scrollToSection('necesidades')"
                  >
                    Que necesita hoy
                  </button>
                  <button
                    type="button"
                    class="border-b-2 border-transparent px-1 py-3 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    (click)="scrollToSection('historial-clinico')"
                  >
                    Historial clinico
                  </button>
                </div>
              </nav>

              <section
                id="historia"
                class="mt-12 max-w-[68ch] scroll-mt-24 rounded-2xl bg-white p-6 shadow-sm md:bg-transparent md:p-0 md:shadow-none"
              >
                <h2 class="text-3xl font-extrabold">Su historia</h2>
                <div class="mt-5 space-y-6 leading-7 text-[var(--color-text)]">
                  @for (paragraph of item.story.slice(0, 3); track paragraph) {
                    <p>{{ paragraph }}</p>
                  }

                  @if (item.story.length > 3) {
                    <div
                      id="historia-contenido-adicional"
                      class="space-y-6 md:block"
                      [class.hidden]="!isStoryExpanded()"
                    >
                      @for (paragraph of item.story.slice(3); track paragraph) {
                        <p>{{ paragraph }}</p>
                      }
                    </div>
                  }
                </div>
                @if (item.story.length > 3) {
                  <button
                    type="button"
                    class="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] md:hidden"
                    [attr.aria-expanded]="isStoryExpanded()"
                    aria-controls="historia-contenido-adicional"
                    (click)="isStoryExpanded.set(!isStoryExpanded())"
                  >
                    {{ isStoryExpanded() ? 'Mostrar menos' : 'Leer historia completa' }}
                    <app-icon name="chevron" class="size-4 transition" [class.rotate-90]="isStoryExpanded()" />
                  </button>
                }
              </section>

              @if (item.currentNeeds.length > 0) {
                <div class="mt-12 max-w-[68ch]">
                  <app-current-needs [needs]="item.currentNeeds" [updatedAt]="item.updatedAt" />
                </div>
              }

              @if (item.updates.length > 0) {
                <div class="mt-12 max-w-[68ch]">
                  <app-updates-timeline [updates]="item.updates" />
                </div>
              }
            </div>

            <aside class="hidden lg:sticky lg:top-24 lg:block">
              <app-donation-card
                title="¿Querés ayudar?"
                [buttonVariant]="'primary'"
                [shareTitle]="shareTitle(item.name)"
                [shareText]="item.summary"
              />
            </aside>
          </div>
        </section>

        <div class="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-white/95 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 shadow-[0_-8px_24px_rgba(32,32,32,0.08)] backdrop-blur lg:hidden">
          <div class="mx-auto flex max-w-md gap-3">
            <app-copy-alias-button class="min-w-0 flex-1" [text]="alias" [variant]="'primary'" />
            <app-share-button [title]="shareTitle(item.name)" [text]="item.summary" />
          </div>
        </div>
      } @else {
        <section class="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h1 class="text-4xl font-black">No encontramos este caso.</h1>
          <p class="mt-4 text-[var(--color-text-muted)]">
            Puede que el enlace haya cambiado o que el caso todavia no este cargado.
          </p>
          <a
            routerLink="/casos"
            class="button-primary mt-8 inline-flex min-h-12 items-center justify-center rounded-full px-8 font-extrabold"
          >
            Ver todos los casos
          </a>
        </section>
      }
    </main>

    <app-footer />
  `
})
export class CaseDetailPageComponent {
  readonly slug = input.required<string>();

  private readonly casesService = inject(RescueCasesService);
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  protected readonly alias = DONATION_CONFIG.alias;
  protected readonly caseData = computed(() => this.casesService.getBySlug(this.slug()));
  protected readonly formatDate = formatDateNumeric;
  protected readonly isStoryExpanded = signal(false);

  constructor() {
    effect(() => {
      const item = this.caseData();
      const pageTitle = item ? `${item.name} | ${SITE_CONFIG.brandName}` : `Caso no encontrado | ${SITE_CONFIG.brandName}`;
      const description = item?.seoDescription ?? item?.summary ?? SITE_CONFIG.defaultDescription;
      this.title.setTitle(pageTitle);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: pageTitle });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
      this.meta.updateTag({ name: 'twitter:description', content: description });
    });
  }

  protected shareTitle(name: string): string {
    return `${name} | ${SITE_CONFIG.brandName}`;
  }

  protected scrollToSection(id: string): void {
    this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
