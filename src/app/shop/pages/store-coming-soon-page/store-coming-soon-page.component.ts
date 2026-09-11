import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AppFooterComponent } from '../../../shared/components/app-footer/app-footer.component';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { BottomNavigationComponent } from '../../../shared/components/bottom-navigation/bottom-navigation.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-store-coming-soon-page',
  imports: [
    RouterLink,
    AppHeaderComponent,
    AppFooterComponent,
    BottomNavigationComponent,
    IconComponent,
  ],
  template: `
    <div class="coming-soon-shell flex min-h-dvh flex-col">
      <app-header />

      <main
        id="contenido"
        class="coming-soon-page relative isolate flex flex-1 items-center overflow-hidden px-4 py-10 pb-28 sm:px-6 sm:py-14 sm:pb-16 lg:px-8"
      >
        <span aria-hidden="true" class="decor decor-dots decor-dots--left"></span>
        <span aria-hidden="true" class="decor decor-dots decor-dots--right"></span>
        <img
          src="images/extra/paw.png"
          alt=""
          aria-hidden="true"
          class="decor decor-paw decor-paw--left"
        />
        <img
          src="images/extra/paw.png"
          alt=""
          aria-hidden="true"
          class="decor decor-paw decor-paw--right"
        />

        <section
          class="poster dark-neon-card relative mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-9 text-center shadow-[0_24px_70px_rgba(58,45,72,0.13)] sm:px-10 sm:py-12 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-12 lg:px-14 lg:py-14 lg:text-left"
          aria-labelledby="coming-soon-title"
        >
          <div class="poster-glow" aria-hidden="true"></div>

          <div class="illustration relative mx-auto w-full max-w-[17rem] lg:max-w-none">
            <div class="orbit" aria-hidden="true">
              <span class="orbit-dot orbit-dot--one"></span>
              <span class="orbit-dot orbit-dot--two"></span>
              <span class="orbit-dot orbit-dot--three"></span>
            </div>

            <div class="icon-stage relative mx-auto grid place-items-center rounded-full">
              <span class="icon-bubble icon-bubble--shop">
                <app-icon name="shop" class="size-14 sm:size-16" />
              </span>
              <span class="icon-bubble icon-bubble--cart">
                <app-icon name="cart" class="size-8 sm:size-9" />
              </span>
              <span class="icon-spark icon-spark--one">
                <app-icon name="spark" class="size-6" />
              </span>
              <span class="icon-spark icon-spark--two">
                <app-icon name="heart" class="size-5" />
              </span>
            </div>

            <span class="work-pill">
              <span class="work-pill-dot" aria-hidden="true"></span>
              Trabajando en ello
            </span>
          </div>

          <div class="poster-copy relative mt-9 lg:mt-0">
            <p class="eyebrow">
              <app-icon name="paw" class="size-4" />
              Tienda online + carrito
            </p>

            <h1 id="coming-soon-title" class="mt-5 text-4xl font-black leading-[1.05] sm:text-5xl">
              Estamos preparando
              <span>algo muy especial</span>
            </h1>

            <p class="message mx-auto mt-5 max-w-xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg lg:mx-0">
              Muy pronto vas a poder encontrar productos solidarios y ayudarnos a seguir
              rescatando vidas con cada compra.
            </p>

            <div class="divider mx-auto my-7 flex max-w-md items-center gap-3 lg:mx-0" aria-hidden="true">
              <span></span>
              <app-icon name="heart" class="size-5" />
              <span></span>
            </div>

            <p class="return-note text-sm font-extrabold uppercase tracking-[0.16em]">
              Volvé pronto, ¡se vienen cosas lindas!
            </p>

            <div class="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                routerLink="/casos"
                class="button-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-extrabold"
              >
                Conocé nuestros casos
                <app-icon name="arrow" class="size-4" />
              </a>
              <a
                routerLink="/"
                class="secondary-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 font-extrabold"
              >
                <app-icon name="home" class="size-4" />
                Volver al inicio
              </a>
            </div>
          </div>
        </section>
      </main>

      <app-footer />
      <app-bottom-navigation />
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100dvh;
    }

    .coming-soon-page {
      background:
        radial-gradient(
          circle at 13% 18%,
          color-mix(in srgb, var(--color-accent-soft) 56%, transparent),
          transparent 22rem
        ),
        radial-gradient(
          circle at 88% 82%,
          color-mix(in srgb, var(--color-accent-soft) 42%, transparent),
          transparent 24rem
        ),
        var(--color-bg);
    }

    .poster {
      isolation: isolate;
    }

    .poster::before {
      position: absolute;
      inset: 0.65rem;
      z-index: -1;
      border: 1px solid color-mix(in srgb, var(--color-accent) 13%, transparent);
      border-radius: 1.55rem;
      content: '';
      pointer-events: none;
    }

    .poster-glow {
      position: absolute;
      z-index: -1;
      top: -9rem;
      right: -7rem;
      width: 24rem;
      aspect-ratio: 1;
      border-radius: 50%;
      background: color-mix(in srgb, var(--color-accent-soft) 42%, transparent);
      filter: blur(1rem);
      pointer-events: none;
    }

    .illustration {
      aspect-ratio: 1;
    }

    .orbit {
      position: absolute;
      inset: 3%;
      border: 3px dashed color-mix(in srgb, var(--color-accent) 68%, transparent);
      border-radius: 50%;
      animation: orbit-turn 38s linear infinite;
    }

    .orbit::before,
    .orbit::after {
      position: absolute;
      border-radius: 50%;
      content: '';
    }

    .orbit::before {
      inset: 0.75rem;
      border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
    }

    .orbit::after {
      inset: 1.55rem;
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--color-accent-soft) 50%, var(--color-card)),
        color-mix(in srgb, var(--color-surface) 76%, var(--color-card))
      );
      box-shadow: inset 0 1px 0 color-mix(in srgb, white 72%, transparent);
    }

    .orbit-dot {
      position: absolute;
      z-index: 2;
      display: block;
      width: 0.65rem;
      aspect-ratio: 1;
      border: 3px solid var(--color-card);
      border-radius: 50%;
      background: var(--color-accent);
      box-sizing: content-box;
    }

    .orbit-dot--one {
      top: 3%;
      left: 27%;
    }

    .orbit-dot--two {
      right: 0;
      bottom: 31%;
    }

    .orbit-dot--three {
      bottom: 5%;
      left: 20%;
    }

    .icon-stage {
      top: 18%;
      width: 64%;
      aspect-ratio: 1;
      color: white;
      background: linear-gradient(145deg, var(--color-accent), var(--color-accent-hover));
      box-shadow:
        0 1.25rem 2.6rem color-mix(in srgb, var(--color-accent) 32%, transparent),
        inset 0 1px 0 rgba(255, 255, 255, 0.35);
    }

    .icon-bubble {
      display: grid;
      place-items: center;
    }

    .icon-bubble--shop {
      transform: translate(-0.35rem, -0.2rem);
    }

    .icon-bubble--cart {
      position: absolute;
      right: -0.65rem;
      bottom: 0.25rem;
      width: 4.6rem;
      aspect-ratio: 1;
      border: 0.35rem solid var(--color-card);
      border-radius: 50%;
      color: var(--color-accent);
      background: var(--color-surface-elevated);
      box-shadow: 0 0.7rem 1.5rem rgba(58, 45, 72, 0.18);
    }

    .icon-spark {
      position: absolute;
      display: grid;
      place-items: center;
      color: var(--color-accent);
    }

    .icon-spark--one {
      top: -0.4rem;
      right: 0.5rem;
      animation: float 3.6s ease-in-out infinite;
    }

    .icon-spark--two {
      bottom: 0.15rem;
      left: -0.75rem;
      animation: float 3.6s 0.8s ease-in-out infinite;
    }

    .work-pill {
      position: absolute;
      right: 50%;
      bottom: 0.15rem;
      display: inline-flex;
      min-height: 2.35rem;
      align-items: center;
      gap: 0.5rem;
      width: max-content;
      border: 1px solid color-mix(in srgb, var(--color-accent) 26%, var(--color-border));
      border-radius: 999px;
      padding: 0.45rem 0.9rem;
      background: color-mix(in srgb, var(--color-card) 90%, transparent);
      box-shadow: 0 0.55rem 1.2rem rgba(58, 45, 72, 0.11);
      color: var(--color-text);
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      transform: translateX(50%);
      backdrop-filter: blur(10px);
    }

    .work-pill-dot {
      width: 0.55rem;
      aspect-ratio: 1;
      border-radius: 50%;
      background: var(--color-accent);
      box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--color-accent) 14%, transparent);
      animation: pulse 2s ease-in-out infinite;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      border: 1px solid color-mix(in srgb, var(--color-accent) 26%, var(--color-border));
      border-radius: 999px;
      padding: 0.45rem 0.8rem;
      background: color-mix(in srgb, var(--color-accent-soft) 28%, var(--color-card));
      color: var(--color-accent);
      font-size: 0.72rem;
      font-weight: 900;
      letter-spacing: 0.11em;
      text-transform: uppercase;
    }

    h1 span {
      display: block;
      color: var(--color-accent);
    }

    .message {
      text-align: center;
    }

    .divider span {
      height: 1px;
      flex: 1;
      background: linear-gradient(to right, transparent, var(--color-border));
    }

    .divider span:last-child {
      background: linear-gradient(to left, transparent, var(--color-border));
    }

    .divider app-icon,
    .return-note {
      color: var(--color-accent);
    }

    .return-note {
      text-align: center;
    }

    .secondary-button {
      border-color: var(--color-border);
      background: color-mix(in srgb, var(--color-card) 88%, var(--color-surface));
      color: var(--color-text);
      transition:
        border-color 180ms ease,
        background-color 180ms ease,
        transform 180ms ease;
    }

    .secondary-button:hover {
      border-color: var(--color-accent);
      background: var(--color-accent-soft);
    }

    .secondary-button:active {
      transform: scale(0.98);
    }

    .decor {
      position: absolute;
      z-index: -1;
      pointer-events: none;
      user-select: none;
    }

    .decor-paw {
      width: clamp(6rem, 10vw, 9rem);
      opacity: 0.2;
    }

    .decor-paw--left {
      bottom: 8%;
      left: clamp(-2rem, 2vw, 2rem);
      transform: rotate(-22deg);
    }

    .decor-paw--right {
      top: 8%;
      right: clamp(-2rem, 2vw, 2rem);
      transform: rotate(20deg);
    }

    .decor-dots {
      width: 13rem;
      aspect-ratio: 1;
      opacity: 0.36;
      background-image: radial-gradient(
        circle,
        color-mix(in srgb, var(--color-accent) 55%, transparent) 1.3px,
        transparent 1.65px
      );
      background-size: 0.8rem 0.8rem;
      mask-image: radial-gradient(circle, #000 18%, transparent 70%);
    }

    .decor-dots--left {
      top: -2rem;
      left: -3rem;
    }

    .decor-dots--right {
      right: -3rem;
      bottom: -2rem;
    }

    :host-context(.dark) .coming-soon-page {
      background:
        radial-gradient(circle at 13% 18%, rgba(153, 94, 220, 0.18), transparent 22rem),
        radial-gradient(circle at 88% 82%, rgba(153, 94, 220, 0.13), transparent 24rem),
        var(--color-bg);
    }

    :host-context(.dark) .poster::before {
      border-color: rgba(208, 166, 255, 0.16);
    }

    :host-context(.dark) .poster-glow {
      background: rgba(152, 83, 222, 0.13);
    }

    :host-context(.dark) .orbit::after {
      background: linear-gradient(145deg, #342747, #282036);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
    }

    :host-context(.dark) .decor-paw {
      opacity: 0.3;
      filter: drop-shadow(0 0 0.8rem rgba(183, 126, 255, 0.17));
    }

    @media (min-width: 1024px) {
      .message {
        text-align: left;
      }

      .return-note {
        text-align: left;
      }

      .work-pill {
        bottom: 3%;
      }
    }

    @media (max-width: 639px) {
      .poster {
        border-radius: 1.65rem;
      }

      .poster::before {
        inset: 0.45rem;
        border-radius: 1.3rem;
      }

      .illustration {
        max-width: 14rem;
      }

      .icon-bubble--cart {
        right: -0.35rem;
        width: 4rem;
      }

      .poster-copy h1 {
        font-size: clamp(2.15rem, 11vw, 2.8rem);
      }

      .return-note {
        font-size: 0.72rem;
        line-height: 1.6;
      }

      .decor-paw--left {
        left: -3.5rem;
      }

      .decor-paw--right {
        right: -3.5rem;
      }
    }

    @keyframes orbit-turn {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes float {
      0%,
      100% {
        transform: translateY(0) rotate(-5deg);
      }
      50% {
        transform: translateY(-0.45rem) rotate(5deg);
      }
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .orbit,
      .icon-spark,
      .work-pill-dot {
        animation: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreComingSoonPageComponent {}
