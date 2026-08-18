import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  afterNextRender,
  inject,
  input,
} from '@angular/core';

export type RevealDirection = 'up' | 'left' | 'right' | 'fade';

@Directive({
  selector: '[appReveal]',
})
export class RevealOnScrollDirective implements OnDestroy {
  readonly appReveal = input<RevealDirection | ''>('up');
  readonly appRevealDelay = input(0);

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender({ write: () => this.initialize() });
  }

  private initialize(): void {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches || !('IntersectionObserver' in window)) {
      return;
    }

    const target = this.element.nativeElement;
    this.renderer.addClass(this.document.documentElement, 'reveal-motion');
    this.renderer.addClass(target, 'reveal');
    this.renderer.setAttribute(target, 'data-reveal', this.appReveal());

    const delay = this.appRevealDelay();
    if (delay > 0) {
      this.renderer.setStyle(target, 'transition-delay', `${delay}ms`);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(target, 'is-visible');
            this.observer?.unobserve(target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    this.observer.observe(target);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
