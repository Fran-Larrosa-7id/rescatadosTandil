# Design — Admin backoffice ("Ficha" system)

<!-- impeccable:design-schema 1 -->

Scope: `src/app/admin/**` only (login + shell + all six pages). The public
site (`src/app/features`, `src/app/shop`, `src/app/shared`) keeps its own
separate purple design system, untouched by this document.

## World

A clinical patient-record chart, reused as the metaphor for every entity in
the backoffice: a product, an order, a payment is a record with a status tab,
not an anonymous spreadsheet row. Replaces the previous generic purple
SaaS-dashboard look entirely.

## Tokens

Declared once on `.admin-shell` (`layout/admin-shell.component.css`) and
duplicated (light values only where relevant) on `.login`
(`pages/admin-login.component.ts`) since the login route renders outside the
shell. Both blocks carry a `@media (prefers-color-scheme: dark)` override.

- `--adm-bg`, `--adm-bg-raised`, `--adm-bg-sunken` — warm paper cream ground,
  three tones (sunken sidebar, raised card, base page).
- `--adm-ink`, `--adm-ink-muted` — near-black sepia ink, muted sepia-gray.
- `--adm-border`, `--adm-border-strong`.
- `--adm-accent`, `--adm-accent-hover`, `--adm-accent-soft`, `--adm-accent-ink`
  — deep forest green, the single brand accent (replaces purple).
- Fixed five-color status vocabulary, reused identically everywhere a state
  is shown (stock, orders, payments, product active/inactive):
  `--adm-ok` (green), `--adm-low` (amber), `--adm-critical` (red),
  `--adm-pending` (blue-gray, reserved for future use), `--adm-resolved`
  (muted olive) — each with a paired `-bg` tone.
- `--adm-font-display`: Zilla Slab (headings — record-card/typewritten-form
  character, not a literary serif).
- `--adm-font-mono`: IBM Plex Mono (every live/critical figure: stock counts,
  SKUs, prices, totals, IDs — read as measured values).
- Body copy stays on the system UI sans stack (Operate default).

## Motifs

- **Folder-tab nav**: sidebar links render as stacked manila-folder tabs;
  the active tab pops forward and visually joins the content edge.
- **Status flags**: `.badge` / `.status-mark` / `.cover-label` render as a
  small flagged tag (a clipped triangular notch on the left edge, not a
  plain border) colored from the fixed five-token vocabulary.
- **Stamp**: reserved exclusively for a confirmed, completed action — the
  `.feedback.success` message gets a rotated circular "OK" stamp. Never used
  decoratively elsewhere.
- **Chart-page cards**: `.editor-section` / `.panel` / `.surface-card` /
  dialogs use an asymmetric corner radius (sharp top-left) evoking a
  clipped record card.
- No kicker/eyebrow above headings (`.eyebrow` is hidden by contract); the
  page title carries its own weight.

## Fonts

Zilla Slab and IBM Plex Mono are loaded via the existing Google Fonts
`<link>` in `src/index.html` (families appended to the same request used by
the public site's Bricolage Grotesque / Manrope — no separate request, no
change to the public site's own families).

## Build note

`angular.json`'s `anyComponentStyle` budget was raised from 4 kB/8 kB to
8 kB/16 kB warning/error to accommodate `admin-pages.css`, the shared
stylesheet for all seven admin page components (products, editor, inventory,
orders, payments, audit, dashboard) plus the shell and dialog system.

## Provenance

No generated raster assets ship with this build (code-led, CSS-only motifs:
clip-path flags, a CSS-drawn stamp). Direction contract recorded at
`.impeccable/surfaces/src-app-admin.md`.
